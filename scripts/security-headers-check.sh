#!/bin/bash
# =============================================================================
# Tool 8: Security Headers Validator
# =============================================================================
# Checks all security headers on the live site and validates their values.
#
# Usage:
#   ./scripts/security-headers-check.sh [URL]
#
# Default URL: https://daribati.ae
# =============================================================================

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SITE_URL="${1:-https://daribati.ae}"
PASS=0
FAIL=0
WARN=0

echo "=========================================="
echo "  Security Headers Validator"
echo "  URL: ${SITE_URL}"
echo "=========================================="
echo ""

# Fetch headers
HEADERS=$(curl -sI -L --max-time 30 \
    -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
    "${SITE_URL}" 2>/dev/null)

if [ -z "$HEADERS" ]; then
    echo -e "${RED}❌ Could not fetch headers from ${SITE_URL}${NC}"
    exit 1
fi

# Function to check a header
check_header() {
    local header_name="$1"
    local expected_pattern="${2:-}"
    local severity="${3:-error}" # error or warn

    local value=$(echo "$HEADERS" | grep -i "^${header_name}:" | head -1 | sed "s/^${header_name}:\s*//i" | tr -d '\r')

    if [ -z "$value" ]; then
        if [ "$severity" = "warn" ]; then
            echo -e "  ${YELLOW}⚠️  ${header_name}${NC}: NOT SET (recommended)"
            WARN=$((WARN + 1))
        else
            echo -e "  ${RED}❌ ${header_name}${NC}: NOT SET"
            FAIL=$((FAIL + 1))
        fi
        return 1
    fi

    if [ -n "$expected_pattern" ]; then
        if echo "$value" | grep -qi "$expected_pattern"; then
            echo -e "  ${GREEN}✅ ${header_name}${NC}: ${value}"
            PASS=$((PASS + 1))
            return 0
        else
            echo -e "  ${YELLOW}⚠️  ${header_name}${NC}: ${value} (expected pattern: ${expected_pattern})"
            WARN=$((WARN + 1))
            return 0
        fi
    else
        echo -e "  ${GREEN}✅ ${header_name}${NC}: ${value}"
        PASS=$((PASS + 1))
        return 0
    fi
}

# === Critical Security Headers ===
echo -e "${BLUE}Critical Security Headers:${NC}"
echo ""

# 1. Content-Security-Policy
check_header "Content-Security-Policy" "" "warn"

# 2. Strict-Transport-Security (HSTS)
check_header "Strict-Transport-Security" "max-age" "error"

# 3. X-Frame-Options
check_header "X-Frame-Options" "DENY\|SAMEORIGIN" "error"

# 4. X-Content-Type-Options
check_header "X-Content-Type-Options" "nosniff" "error"

# 5. Referrer-Policy
check_header "Referrer-Policy" "" "error"

# 6. Permissions-Policy
check_header "Permissions-Policy" "" "warn"

echo ""
echo -e "${BLUE}Additional Security Headers:${NC}"
echo ""

# 7. X-XSS-Protection (legacy but still checked)
check_header "X-XSS-Protection" "" "warn"

# 8. Cross-Origin-Opener-Policy
check_header "Cross-Origin-Opener-Policy" "" "warn"

# 9. Cross-Origin-Resource-Policy
check_header "Cross-Origin-Resource-Policy" "" "warn"

# 10. Cross-Origin-Embedder-Policy
check_header "Cross-Origin-Embedder-Policy" "" "warn"

echo ""
echo -e "${BLUE}Server Information (information disclosure):${NC}"
echo ""

# Check for information leakage
SERVER_HEADER=$(echo "$HEADERS" | grep -i "^server:" | head -1 | sed 's/^server:\s*//i' | tr -d '\r')
if [ -n "$SERVER_HEADER" ]; then
    if echo "$SERVER_HEADER" | grep -qi "cloudflare"; then
        echo -e "  ${GREEN}ℹ️  Server${NC}: ${SERVER_HEADER} (Cloudflare - expected)"
    else
        echo -e "  ${YELLOW}⚠️  Server${NC}: ${SERVER_HEADER} (consider hiding)"
        WARN=$((WARN + 1))
    fi
else
    echo -e "  ${GREEN}✅ Server${NC}: Not disclosed"
    PASS=$((PASS + 1))
fi

# Check X-Powered-By
POWERED_BY=$(echo "$HEADERS" | grep -i "^x-powered-by:" | head -1 | tr -d '\r')
if [ -n "$POWERED_BY" ]; then
    echo -e "  ${YELLOW}⚠️  X-Powered-By${NC}: ${POWERED_BY} (should be removed)"
    WARN=$((WARN + 1))
else
    echo -e "  ${GREEN}✅ X-Powered-By${NC}: Not disclosed"
    PASS=$((PASS + 1))
fi

echo ""
echo -e "${BLUE}HTTPS & Certificate:${NC}"
echo ""

# Check HTTPS redirect
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "http://$(echo $SITE_URL | sed 's|https://||')" 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "308" ]; then
    echo -e "  ${GREEN}✅ HTTP→HTTPS redirect${NC}: ${HTTP_CODE}"
    PASS=$((PASS + 1))
elif [ "$HTTP_CODE" = "302" ] || [ "$HTTP_CODE" = "307" ]; then
    echo -e "  ${YELLOW}⚠️  HTTP→HTTPS redirect${NC}: ${HTTP_CODE} (should be 301/308 for permanent)"
    WARN=$((WARN + 1))
else
    echo -e "  ${RED}❌ HTTP→HTTPS redirect${NC}: ${HTTP_CODE} (no redirect detected)"
    FAIL=$((FAIL + 1))
fi

# Check for secure cookies
COOKIES=$(echo "$HEADERS" | grep -i "^set-cookie:" || echo "")
if [ -n "$COOKIES" ]; then
    if echo "$COOKIES" | grep -qi "secure"; then
        echo -e "  ${GREEN}✅ Cookies${NC}: Secure flag present"
        PASS=$((PASS + 1))
    else
        echo -e "  ${YELLOW}⚠️  Cookies${NC}: Missing Secure flag"
        WARN=$((WARN + 1))
    fi
    if echo "$COOKIES" | grep -qi "httponly"; then
        echo -e "  ${GREEN}✅ Cookies${NC}: HttpOnly flag present"
        PASS=$((PASS + 1))
    else
        echo -e "  ${YELLOW}⚠️  Cookies${NC}: Missing HttpOnly flag"
        WARN=$((WARN + 1))
    fi
else
    echo -e "  ${GREEN}ℹ️  Cookies${NC}: No cookies set on initial request"
fi

# Summary
echo ""
echo "=========================================="
echo "  Results: ${PASS} passed, ${FAIL} failed, ${WARN} warnings"
echo "=========================================="
echo ""

if [ $FAIL -gt 0 ]; then
    echo -e "${RED}Security headers validation FAILED with ${FAIL} critical issue(s).${NC}"
    echo ""
    echo "Recommendations:"
    echo "  1. Add missing headers in next.config.mjs headers() function"
    echo "  2. Or configure them via Cloudflare Transform Rules"
    echo "  3. Test with: https://securityheaders.com/?q=${SITE_URL}"
    exit 1
elif [ $WARN -gt 0 ]; then
    echo -e "${YELLOW}Security headers check passed with ${WARN} warning(s).${NC}"
    exit 0
else
    echo -e "${GREEN}All security headers are properly configured!${NC}"
    exit 0
fi
