#!/bin/bash
#
# Cloudflare Bot Fight Mode Management Script for daribati.ae
# ===========================================================
#
# This script checks and configures Bot Fight Mode and WAF rules
# to prevent legitimate users from being blocked (403 errors).
#
# Prerequisites:
#   - CLOUDFLARE_API_TOKEN environment variable set
#   - CLOUDFLARE_ZONE_ID environment variable set (or auto-detected)
#
# Usage:
#   export CLOUDFLARE_API_TOKEN="your-api-token"
#   bash scripts/cloudflare-bot-management.sh [check|disable-bot-fight|setup-waf]
#

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

DOMAIN="daribati.ae"
API_BASE="https://api.cloudflare.com/client/v4"

# Validate token
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
    echo -e "${RED}ERROR: CLOUDFLARE_API_TOKEN environment variable is not set${NC}"
    echo "Please set it: export CLOUDFLARE_API_TOKEN='your-token'"
    exit 1
fi

HEADERS=(
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"
    -H "Content-Type: application/json"
)

# Get Zone ID if not set
get_zone_id() {
    if [ -z "${CLOUDFLARE_ZONE_ID:-}" ]; then
        echo -e "${BLUE}🔍 Looking up zone ID for ${DOMAIN}...${NC}"
        ZONE_RESPONSE=$(curl -s "${API_BASE}/zones?name=${DOMAIN}" "${HEADERS[@]}")
        CLOUDFLARE_ZONE_ID=$(echo "$ZONE_RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success') and data.get('result'):
    print(data['result'][0]['id'])
else:
    print('ERROR')
")
        if [ "$CLOUDFLARE_ZONE_ID" = "ERROR" ] || [ -z "$CLOUDFLARE_ZONE_ID" ]; then
            echo -e "${RED}ERROR: Could not find zone for ${DOMAIN}${NC}"
            echo "Response: $ZONE_RESPONSE"
            exit 1
        fi
        echo -e "${GREEN}✅ Zone ID: ${CLOUDFLARE_ZONE_ID}${NC}"
    fi
}

# Check current Bot Fight Mode status
check_bot_fight_mode() {
    echo -e "\n${BLUE}═══════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  Checking Bot Fight Mode for ${DOMAIN}${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}\n"

    # Check Bot Fight Mode (free plan)
    echo -e "${YELLOW}1. Bot Fight Mode (Free):${NC}"
    BFM_RESPONSE=$(curl -s "${API_BASE}/zones/${CLOUDFLARE_ZONE_ID}/bot_management" "${HEADERS[@]}")
    echo "$BFM_RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    result = data.get('result', {})
    print(f'   Fight Mode: {result.get(\"fight_mode\", \"N/A\")}')
    print(f'   Using Latest Model: {result.get(\"using_latest_model\", \"N/A\")}')
    print(f'   Optimize WordPress: {result.get(\"optimize_wordpress\", \"N/A\")}')
    print(f'   Suppress Session Score: {result.get(\"suppress_session_score\", \"N/A\")}')
    print(f'   Enable JS: {result.get(\"enable_js\", \"N/A\")}')
else:
    errors = data.get('errors', [])
    print(f'   Status: Could not retrieve (may require higher plan)')
    for e in errors:
        print(f'   Error: {e.get(\"message\", \"Unknown\")}')
"

    # Check Super Bot Fight Mode settings
    echo -e "\n${YELLOW}2. Super Bot Fight Mode:${NC}"
    SBFM_RESPONSE=$(curl -s "${API_BASE}/zones/${CLOUDFLARE_ZONE_ID}/bot_management" "${HEADERS[@]}")
    echo "$SBFM_RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    result = data.get('result', {})
    sbfm = result.get('sbfm_definitely_automated', 'N/A')
    sbfm_likely = result.get('sbfm_likely_automated', 'N/A')
    sbfm_verified = result.get('sbfm_verified_bots', 'N/A')
    sbfm_static = result.get('sbfm_static_resource_protection', 'N/A')
    print(f'   Definitely Automated: {sbfm}')
    print(f'   Likely Automated: {sbfm_likely}')
    print(f'   Verified Bots: {sbfm_verified}')
    print(f'   Static Resource Protection: {sbfm_static}')
"

    # Check WAF/Firewall rules
    echo -e "\n${YELLOW}3. Active Firewall Rules:${NC}"
    FW_RESPONSE=$(curl -s "${API_BASE}/zones/${CLOUDFLARE_ZONE_ID}/firewall/rules" "${HEADERS[@]}")
    echo "$FW_RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    rules = data.get('result', [])
    if not rules:
        print('   No custom firewall rules found')
    for rule in rules:
        print(f'   - {rule.get(\"description\", \"No description\")} [{rule.get(\"action\", \"?\")}]')
        print(f'     Filter: {rule.get(\"filter\", {}).get(\"expression\", \"N/A\")}')
else:
    print('   Could not retrieve firewall rules')
"

    # Check WAF custom rules (rulesets)
    echo -e "\n${YELLOW}4. WAF Custom Rules (Rulesets):${NC}"
    RS_RESPONSE=$(curl -s "${API_BASE}/zones/${CLOUDFLARE_ZONE_ID}/rulesets" "${HEADERS[@]}")
    echo "$RS_RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    rulesets = data.get('result', [])
    custom = [r for r in rulesets if r.get('phase') == 'http_request_firewall_custom']
    if not custom:
        print('   No custom WAF rulesets found')
    for rs in custom:
        print(f'   Ruleset: {rs.get(\"name\", \"Unnamed\")} (ID: {rs.get(\"id\", \"?\")})')
"

    # Test site accessibility
    echo -e "\n${YELLOW}5. Site Accessibility Test:${NC}"
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 15 \
        -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
        "https://${DOMAIN}" || echo "000")
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "   ${GREEN}✅ Site is accessible (HTTP ${HTTP_CODE})${NC}"
    elif [ "$HTTP_CODE" = "403" ]; then
        echo -e "   ${RED}❌ Site is BLOCKED (HTTP 403) - Bot Fight Mode likely active${NC}"
    else
        echo -e "   ${YELLOW}⚠️  Site returned HTTP ${HTTP_CODE}${NC}"
    fi
}

# Disable Bot Fight Mode
disable_bot_fight_mode() {
    echo -e "\n${BLUE}═══════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  Disabling Bot Fight Mode for ${DOMAIN}${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}\n"

    # Disable Bot Fight Mode
    echo -e "${YELLOW}Disabling Bot Fight Mode...${NC}"
    RESULT=$(curl -s -X PUT "${API_BASE}/zones/${CLOUDFLARE_ZONE_ID}/bot_management" \
        "${HEADERS[@]}" \
        -d '{
            "fight_mode": false,
            "sbfm_definitely_automated": "allow",
            "sbfm_likely_automated": "allow",
            "sbfm_verified_bots": "allow",
            "sbfm_static_resource_protection": false
        }')

    echo "$RESULT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    print('   ✅ Bot Fight Mode disabled successfully')
else:
    errors = data.get('errors', [])
    for e in errors:
        print(f'   ❌ Error: {e.get(\"message\", \"Unknown\")}')
    print('   Note: Some settings may require a Pro/Business plan to modify via API')
"
}

# Set up proper WAF rules
setup_waf_rules() {
    echo -e "\n${BLUE}═══════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  Setting Up WAF Rules for ${DOMAIN}${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}\n"

    # Get the custom ruleset ID (or create one)
    echo -e "${YELLOW}1. Setting up WAF exception for verified bots...${NC}"

    # Create WAF rule to allow known good bots (Googlebot, Bingbot, etc.)
    RULE_RESPONSE=$(curl -s -X POST \
        "${API_BASE}/zones/${CLOUDFLARE_ZONE_ID}/rulesets/phases/http_request_firewall_custom/entrypoint" \
        "${HEADERS[@]}" \
        -d '{
            "description": "Daribati WAF Custom Rules",
            "rules": [
                {
                    "description": "Allow verified search engine bots",
                    "expression": "(cf.client.bot) or (cf.bot_management.verified_bot)",
                    "action": "skip",
                    "action_parameters": {
                        "ruleset": "current"
                    },
                    "enabled": true
                },
                {
                    "description": "Allow legitimate browsers from UAE/GCC",
                    "expression": "(ip.geoip.country in {\"AE\" \"SA\" \"KW\" \"QA\" \"BH\" \"OM\"}) and (http.user_agent contains \"Mozilla\")",
                    "action": "skip",
                    "action_parameters": {
                        "ruleset": "current"
                    },
                    "enabled": true
                },
                {
                    "description": "Challenge suspicious automated traffic",
                    "expression": "(cf.bot_management.score lt 30) and (not cf.bot_management.verified_bot) and (not cf.client.bot)",
                    "action": "managed_challenge",
                    "enabled": true
                },
                {
                    "description": "Block known malicious patterns",
                    "expression": "(http.request.uri.path contains \"/.env\") or (http.request.uri.path contains \"/wp-admin\") or (http.request.uri.path contains \"/xmlrpc.php\") or (http.request.uri.path contains \"/.git\")",
                    "action": "block",
                    "enabled": true
                }
            ]
        }')

    echo "$RULE_RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    result = data.get('result', {})
    rules = result.get('rules', [])
    print(f'   ✅ Created {len(rules)} WAF rules successfully')
    for rule in rules:
        print(f'      - {rule.get(\"description\", \"Unnamed\")} [{rule.get(\"action\", \"?\")}]')
else:
    errors = data.get('errors', [])
    for e in errors:
        print(f'   ❌ Error: {e.get(\"message\", \"Unknown\")} (code: {e.get(\"code\", \"?\")})')
    print()
    print('   Note: If this fails, you may need to:')
    print('   1. Go to Cloudflare Dashboard > Security > Bots')
    print('   2. Disable \"Bot Fight Mode\" toggle')
    print('   3. Go to Security > WAF > Custom Rules')
    print('   4. Create the rules manually')
"

    echo -e "\n${YELLOW}2. Setting up rate limiting for API protection...${NC}"
    RATE_RESPONSE=$(curl -s -X POST \
        "${API_BASE}/zones/${CLOUDFLARE_ZONE_ID}/rulesets/phases/http_ratelimit/entrypoint" \
        "${HEADERS[@]}" \
        -d '{
            "description": "Daribati Rate Limiting Rules",
            "rules": [
                {
                    "description": "Rate limit API endpoints",
                    "expression": "(http.request.uri.path contains \"/api/\")",
                    "action": "block",
                    "action_parameters": {
                        "response": {
                            "status_code": 429,
                            "content_type": "application/json",
                            "content": "{\"error\": \"Rate limit exceeded. Please try again later.\"}"
                        }
                    },
                    "ratelimit": {
                        "characteristics": ["ip.src"],
                        "period": 60,
                        "requests_per_period": 100,
                        "mitigation_timeout": 300
                    },
                    "enabled": true
                }
            ]
        }')

    echo "$RATE_RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    print('   ✅ Rate limiting rules created successfully')
else:
    errors = data.get('errors', [])
    for e in errors:
        print(f'   ❌ Error: {e.get(\"message\", \"Unknown\")}')
    print('   Note: Rate limiting may require a paid plan')
"
}

# Main execution
get_zone_id

case "${1:-check}" in
    check)
        check_bot_fight_mode
        ;;
    disable-bot-fight)
        disable_bot_fight_mode
        echo ""
        check_bot_fight_mode
        ;;
    setup-waf)
        setup_waf_rules
        echo ""
        check_bot_fight_mode
        ;;
    full)
        disable_bot_fight_mode
        setup_waf_rules
        echo ""
        check_bot_fight_mode
        ;;
    *)
        echo "Usage: $0 [check|disable-bot-fight|setup-waf|full]"
        echo ""
        echo "Commands:"
        echo "  check            - Check current Bot Fight Mode and WAF status"
        echo "  disable-bot-fight - Disable Bot Fight Mode"
        echo "  setup-waf        - Set up proper WAF rules"
        echo "  full             - Disable Bot Fight Mode and set up WAF rules"
        exit 1
        ;;
esac
