#!/bin/bash
# =============================================================================
# Tool 5 Supporting Script: DNS Health Check
# =============================================================================
# Checks DNS resolution, SSL certificates, and routing for daribati.ae
#
# Usage:
#   ./scripts/dns-health-check.sh
# =============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PASS=0
FAIL=0
WARN=0

echo "=========================================="
echo "  DNS Health Check - daribati.ae"
echo "  Time: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
echo "=========================================="
echo ""

# Test 1: DNS Resolution (apex)
echo -e "${BLUE}Test 1: DNS Resolution (daribati.ae)${NC}"
A_RECORDS=$(dig +short daribati.ae A 2>/dev/null || echo "")
CNAME=$(dig +short daribati.ae CNAME 2>/dev/null || echo "")

if [ -n "$A_RECORDS" ] || [ -n "$CNAME" ]; then
    echo -e "  ${GREEN}✅ PASS${NC} - A: ${A_RECORDS:-none}, CNAME: ${CNAME:-none}"
    PASS=$((PASS + 1))
else
    echo -e "  ${RED}❌ FAIL${NC} - No DNS records found"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 2: DNS Resolution (www)
echo -e "${BLUE}Test 2: DNS Resolution (www.daribati.ae)${NC}"
WWW_CNAME=$(dig +short www.daribati.ae CNAME 2>/dev/null || echo "")
WWW_A=$(dig +short www.daribati.ae A 2>/dev/null || echo "")

if [ -n "$WWW_CNAME" ] || [ -n "$WWW_A" ]; then
    echo -e "  ${GREEN}✅ PASS${NC} - CNAME: ${WWW_CNAME:-none}, A: ${WWW_A:-none}"
    PASS=$((PASS + 1))
else
    echo -e "  ${RED}❌ FAIL${NC} - No DNS records for www"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 3: SSL Certificate
echo -e "${BLUE}Test 3: SSL Certificate Validity${NC}"
CERT_EXPIRY=$(echo | openssl s_client -servername daribati.ae -connect daribati.ae:443 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2 || echo "FAILED")

if [ "$CERT_EXPIRY" != "FAILED" ] && [ -n "$CERT_EXPIRY" ]; then
    EXPIRY_EPOCH=$(date -d "$CERT_EXPIRY" +%s 2>/dev/null || echo "0")
    NOW_EPOCH=$(date +%s)
    DAYS_LEFT=$(( (EXPIRY_EPOCH - NOW_EPOCH) / 86400 ))

    if [ "$DAYS_LEFT" -gt 14 ]; then
        echo -e "  ${GREEN}✅ PASS${NC} - Expires in ${DAYS_LEFT} days ($CERT_EXPIRY)"
        PASS=$((PASS + 1))
    elif [ "$DAYS_LEFT" -gt 0 ]; then
        echo -e "  ${YELLOW}⚠️ WARN${NC} - Expires in ${DAYS_LEFT} days ($CERT_EXPIRY)"
        WARN=$((WARN + 1))
    else
        echo -e "  ${RED}❌ FAIL${NC} - Certificate expired!"
        FAIL=$((FAIL + 1))
    fi
else
    echo -e "  ${RED}❌ FAIL${NC} - Could not check certificate"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 4: HTTP Accessibility
echo -e "${BLUE}Test 4: HTTP Accessibility${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 30 "https://daribati.ae" 2>/dev/null || echo "000")

if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 400 ]; then
    echo -e "  ${GREEN}✅ PASS${NC} - HTTP $HTTP_CODE"
    PASS=$((PASS + 1))
else
    echo -e "  ${RED}❌ FAIL${NC} - HTTP $HTTP_CODE"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 5: Cloudflare routing
echo -e "${BLUE}Test 5: Cloudflare Routing${NC}"
SERVER=$(curl -sI -L --max-time 15 "https://daribati.ae" 2>/dev/null | grep -i "^server:" | head -1 || echo "")

if echo "$SERVER" | grep -qi "cloudflare"; then
    echo -e "  ${GREEN}✅ PASS${NC} - Served by Cloudflare"
    PASS=$((PASS + 1))
else
    echo -e "  ${YELLOW}⚠️ WARN${NC} - Server: $SERVER"
    WARN=$((WARN + 1))
fi
echo ""

# Summary
echo "=========================================="
echo "  Results: ${PASS} passed, ${FAIL} failed, ${WARN} warnings"
echo "=========================================="

if [ $FAIL -gt 0 ]; then
    exit 1
fi
exit 0
