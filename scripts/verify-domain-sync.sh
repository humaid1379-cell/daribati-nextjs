#!/bin/bash
# Domain Sync Verification Script for daribati.ae
# Can be run standalone or as part of CI/CD pipeline

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "  Domain Sync Verification - daribati.ae"
echo "=========================================="
echo ""

PASS=0
FAIL=0

# Test 1: www.daribati.ae redirect
echo "📋 Test 1: www.daribati.ae → daribati.ae redirect"
FINAL_URL=$(curl -s -o /dev/null -w "%{url_effective}" -L --max-time 30 "https://www.daribati.ae" 2>/dev/null || echo "FAILED")
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 30 "https://www.daribati.ae" 2>/dev/null || echo "000")

if echo "$FINAL_URL" | grep -q "https://daribati.ae"; then
    echo -e "   ${GREEN}✅ PASS${NC} - www.daribati.ae redirects to daribati.ae (HTTP $HTTP_CODE)"
    PASS=$((PASS + 1))
else
    echo -e "   ${RED}❌ FAIL${NC} - www.daribati.ae does NOT redirect properly"
    echo "   Final URL: $FINAL_URL (HTTP $HTTP_CODE)"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 2: daribati.ae accessibility
echo "📋 Test 2: daribati.ae accessibility"
MAIN_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "https://daribati.ae" 2>/dev/null || echo "000")

if [ "$MAIN_CODE" -ge 200 ] && [ "$MAIN_CODE" -lt 400 ]; then
    echo -e "   ${GREEN}✅ PASS${NC} - daribati.ae is accessible (HTTP $MAIN_CODE)"
    PASS=$((PASS + 1))
else
    echo -e "   ${RED}❌ FAIL${NC} - daribati.ae returned HTTP $MAIN_CODE"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 3: Pages.dev accessibility
echo "📋 Test 3: daribati-nextjs.pages.dev accessibility"
PAGES_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "https://daribati-nextjs.pages.dev" 2>/dev/null || echo "000")

if [ "$PAGES_CODE" -ge 200 ] && [ "$PAGES_CODE" -lt 400 ]; then
    echo -e "   ${GREEN}✅ PASS${NC} - daribati-nextjs.pages.dev is accessible (HTTP $PAGES_CODE)"
    PASS=$((PASS + 1))
else
    echo -e "   ${YELLOW}⚠️ WARN${NC} - daribati-nextjs.pages.dev returned HTTP $PAGES_CODE"
    FAIL=$((FAIL + 1))
fi
echo ""

# Test 4: Check latest deployment (requires CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID)
if [ -n "$CLOUDFLARE_API_TOKEN" ] && [ -n "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo "📋 Test 4: Deployment sync check"
    DEPLOY_INFO=$(curl -s -X GET \
        "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/daribati-nextjs/deployments?sort_by=created_on&sort_order=desc&per_page=1" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json")
    
    DEPLOY_COMMIT=$(echo "$DEPLOY_INFO" | jq -r '.result[0].deployment_trigger.metadata.commit_hash // "unknown"')
    DEPLOY_STATUS=$(echo "$DEPLOY_INFO" | jq -r '.result[0].latest_stage.status // "unknown"')
    DEPLOY_TIME=$(echo "$DEPLOY_INFO" | jq -r '.result[0].created_on // "unknown"')
    
    echo "   Latest deployment commit: $DEPLOY_COMMIT"
    echo "   Deployment status: $DEPLOY_STATUS"
    echo "   Deployment time: $DEPLOY_TIME"
    
    if [ "$DEPLOY_STATUS" = "success" ]; then
        echo -e "   ${GREEN}✅ PASS${NC} - Latest deployment succeeded"
        PASS=$((PASS + 1))
    else
        echo -e "   ${RED}❌ FAIL${NC} - Latest deployment status: $DEPLOY_STATUS"
        FAIL=$((FAIL + 1))
    fi
else
    echo "📋 Test 4: Deployment sync check (SKIPPED - no API credentials)"
fi
echo ""

# Summary
echo "=========================================="
echo "  Results: $PASS passed, $FAIL failed"
echo "=========================================="

if [ $FAIL -gt 0 ]; then
    exit 1
fi
