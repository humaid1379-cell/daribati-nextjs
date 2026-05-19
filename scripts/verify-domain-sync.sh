#!/bin/bash
# =============================================================================
# Tool 9 Supporting Script: Domain Sync Verification
# =============================================================================
# Compares JS bundle hashes between custom domain and pages.dev
# Checks for Worker route conflicts and stale proxy workers
#
# Usage:
#   ./scripts/verify-domain-sync.sh
#
# Required environment variables (for full check):
#   CLOUDFLARE_API_TOKEN
#   CLOUDFLARE_ZONE_ID
# =============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

CUSTOM_DOMAIN="https://daribati.ae"
PAGES_DOMAIN="https://daribati-nextjs.pages.dev"
ZONE_ID="${CLOUDFLARE_ZONE_ID:-9da22a778f96f90dc21cdb7e1886d260}"

PASS=0
FAIL=0

echo "=========================================="
echo "  Domain Sync Verification"
echo "  Custom: ${CUSTOM_DOMAIN}"
echo "  Pages:  ${PAGES_DOMAIN}"
echo "=========================================="
echo ""

# Test 1: Compare build IDs
echo -e "${BLUE}Test 1: JS Bundle Hash Comparison${NC}"
CUSTOM_HTML=$(curl -s -L --max-time 30 \
    -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
    "${CUSTOM_DOMAIN}" 2>/dev/null || echo "")
PAGES_HTML=$(curl -s -L --max-time 30 \
    -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
    "${PAGES_DOMAIN}" 2>/dev/null || echo "")

CUSTOM_BUILD=$(echo "$CUSTOM_HTML" | grep -oP '/_next/static/\K[A-Za-z0-9_-]+(?=/_buildManifest)' | head -1 || echo "none")
PAGES_BUILD=$(echo "$PAGES_HTML" | grep -oP '/_next/static/\K[A-Za-z0-9_-]+(?=/_buildManifest)' | head -1 || echo "none")

echo "  Custom domain build: $CUSTOM_BUILD"
echo "  Pages.dev build:     $PAGES_BUILD"

if [ "$CUSTOM_BUILD" = "$PAGES_BUILD" ] && [ "$CUSTOM_BUILD" != "none" ]; then
    echo -e "  ${GREEN}✅ PASS${NC} - Build IDs match"
    PASS=$((PASS + 1))
elif [ "$CUSTOM_BUILD" = "none" ] && [ "$PAGES_BUILD" = "none" ]; then
    echo -e "  ${YELLOW}⚠️ WARN${NC} - Could not extract build IDs from either domain"
else
    echo -e "  ${RED}❌ FAIL${NC} - Build IDs do not match"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 2: Check for Worker routes
echo -e "${BLUE}Test 2: Worker Route Conflicts${NC}"
if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
    ROUTES=$(curl -s -X GET \
        "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/workers/routes" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json" 2>/dev/null)

    ROUTE_COUNT=$(echo "$ROUTES" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d.get('result',[])))" 2>/dev/null || echo "0")
    echo "  Found $ROUTE_COUNT Worker route(s)"

    CONFLICTS=$(echo "$ROUTES" | python3 -c "
import sys, json
data = json.load(sys.stdin)
conflicts = []
for route in data.get('result', []):
    pattern = route.get('pattern', '')
    if 'daribati' in pattern and '*' in pattern:
        conflicts.append(f'{pattern} -> {route.get(\"script\", \"no script\")}')
if conflicts:
    for c in conflicts:
        print(f'  ⚠️  {c}')
else:
    print('  No conflicting routes found')
" 2>/dev/null || echo "  Could not parse routes")

    echo "$CONFLICTS"
    if echo "$CONFLICTS" | grep -q "⚠️"; then
        FAIL=$((FAIL + 1))
    else
        PASS=$((PASS + 1))
    fi
else
    echo -e "  ${YELLOW}⚠️ SKIPPED${NC} - No CLOUDFLARE_API_TOKEN set"
fi
echo ""

# Test 3: Check for stale proxy behavior
echo -e "${BLUE}Test 3: Stale Proxy Detection${NC}"
CUSTOM_HEADERS=$(curl -sI -L --max-time 15 "${CUSTOM_DOMAIN}" 2>/dev/null)

# Check cf-ray header (should be present for Cloudflare)
CF_RAY=$(echo "$CUSTOM_HEADERS" | grep -i "^cf-ray:" | head -1 | tr -d '\r')
if [ -n "$CF_RAY" ]; then
    echo -e "  ${GREEN}✅${NC} Cloudflare Ray ID present: $(echo $CF_RAY | cut -d: -f2 | xargs)"
else
    echo -e "  ${RED}❌${NC} No Cloudflare Ray ID (traffic may not be going through CF)"
    FAIL=$((FAIL + 1))
fi

# Check for unexpected redirects
REDIRECT_CHECK=$(curl -s -o /dev/null -w "%{redirect_url}" --max-time 15 "${CUSTOM_DOMAIN}" 2>/dev/null || echo "")
if [ -n "$REDIRECT_CHECK" ]; then
    if echo "$REDIRECT_CHECK" | grep -q "pages.dev"; then
        echo -e "  ${RED}❌${NC} Custom domain redirects to pages.dev (stale proxy!)"
        FAIL=$((FAIL + 1))
    else
        echo -e "  ${YELLOW}⚠️${NC} Redirect detected: $REDIRECT_CHECK"
    fi
else
    echo -e "  ${GREEN}✅${NC} No unexpected redirects"
    PASS=$((PASS + 1))
fi

# Check response time difference
CUSTOM_TIME=$(curl -s -o /dev/null -w "%{time_total}" -L --max-time 15 "${CUSTOM_DOMAIN}" 2>/dev/null || echo "0")
PAGES_TIME=$(curl -s -o /dev/null -w "%{time_total}" -L --max-time 15 "${PAGES_DOMAIN}" 2>/dev/null || echo "0")
echo "  Response times: Custom=${CUSTOM_TIME}s, Pages=${PAGES_TIME}s"

echo ""
echo "=========================================="
echo "  Results: ${PASS} passed, ${FAIL} failed"
echo "=========================================="

if [ $FAIL -gt 0 ]; then
    exit 1
fi
exit 0
