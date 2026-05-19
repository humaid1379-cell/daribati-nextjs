#!/bin/bash
# =============================================================================
# Tool 3: Cloudflare WAF Manager
# =============================================================================
# Manages WAF rules and Bot Fight Mode for daribati.ae
# Used by CI/CD for E2E testing and manual WAF management
#
# Usage:
#   ./scripts/waf-manager.sh status          - Check current WAF and Bot Fight Mode status
#   ./scripts/waf-manager.sh disable-geo     - Temporarily disable geo-challenge rule
#   ./scripts/waf-manager.sh enable-geo      - Re-enable geo-challenge rule
#   ./scripts/waf-manager.sh disable-bot     - Disable Bot Fight Mode
#   ./scripts/waf-manager.sh enable-bot      - Enable Bot Fight Mode
#   ./scripts/waf-manager.sh testing-mode    - Disable both for E2E testing
#   ./scripts/waf-manager.sh production-mode - Re-enable both for production
#
# Required environment variables:
#   CLOUDFLARE_API_TOKEN or (CLOUDFLARE_EMAIL + CLOUDFLARE_API_KEY)
#   CLOUDFLARE_ZONE_ID
# =============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
ZONE_ID="${CLOUDFLARE_ZONE_ID:-9da22a778f96f90dc21cdb7e1886d260}"
API_BASE="https://api.cloudflare.com/client/v4"

# Determine auth method
get_auth_headers() {
    if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
        echo "-H \"Authorization: Bearer ${CLOUDFLARE_API_TOKEN}\""
    elif [ -n "${CLOUDFLARE_EMAIL:-}" ] && [ -n "${CLOUDFLARE_API_KEY:-}" ]; then
        echo "-H \"X-Auth-Email: ${CLOUDFLARE_EMAIL}\" -H \"X-Auth-Key: ${CLOUDFLARE_API_KEY}\""
    else
        echo -e "${RED}ERROR: No Cloudflare credentials found.${NC}"
        echo "Set CLOUDFLARE_API_TOKEN or (CLOUDFLARE_EMAIL + CLOUDFLARE_API_KEY)"
        exit 1
    fi
}

# Make authenticated API call
cf_api() {
    local method="$1"
    local endpoint="$2"
    local data="${3:-}"

    if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
        if [ -n "$data" ]; then
            curl -s -X "$method" \
                "${API_BASE}${endpoint}" \
                -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
                -H "Content-Type: application/json" \
                -d "$data"
        else
            curl -s -X "$method" \
                "${API_BASE}${endpoint}" \
                -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
                -H "Content-Type: application/json"
        fi
    else
        if [ -n "$data" ]; then
            curl -s -X "$method" \
                "${API_BASE}${endpoint}" \
                -H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" \
                -H "X-Auth-Key: ${CLOUDFLARE_API_KEY}" \
                -H "Content-Type: application/json" \
                -d "$data"
        else
            curl -s -X "$method" \
                "${API_BASE}${endpoint}" \
                -H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" \
                -H "X-Auth-Key: ${CLOUDFLARE_API_KEY}" \
                -H "Content-Type: application/json"
        fi
    fi
}

# Check Bot Fight Mode status
check_bot_fight_mode() {
    echo -e "${BLUE}Checking Bot Fight Mode...${NC}"
    local response
    response=$(cf_api GET "/zones/${ZONE_ID}/bot_management")
    local success=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('success', False))" 2>/dev/null || echo "False")

    if [ "$success" = "True" ]; then
        local fight_mode=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('result',{}).get('fight_mode', 'unknown'))" 2>/dev/null || echo "unknown")
        if [ "$fight_mode" = "True" ] || [ "$fight_mode" = "true" ]; then
            echo -e "  Bot Fight Mode: ${RED}ENABLED${NC}"
            return 0
        else
            echo -e "  Bot Fight Mode: ${GREEN}DISABLED${NC}"
            return 1
        fi
    else
        # Try alternative endpoint for free plans
        local alt_response
        alt_response=$(cf_api GET "/zones/${ZONE_ID}/settings/bot_fight_mode" 2>/dev/null || echo '{}')
        local alt_value=$(echo "$alt_response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('result',{}).get('value', 'unknown'))" 2>/dev/null || echo "unknown")
        echo -e "  Bot Fight Mode: ${YELLOW}${alt_value}${NC} (free plan)"
    fi
}

# Check WAF/Firewall rules
check_waf_rules() {
    echo -e "${BLUE}Checking WAF/Firewall Rules...${NC}"
    local response
    response=$(cf_api GET "/zones/${ZONE_ID}/firewall/rules")
    local success=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('success', False))" 2>/dev/null || echo "False")

    if [ "$success" = "True" ]; then
        local count=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d.get('result',[])))" 2>/dev/null || echo "0")
        echo -e "  Active firewall rules: ${count}"

        # List rules with geo-challenge
        echo "$response" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for rule in data.get('result', []):
    action = rule.get('action', 'unknown')
    desc = rule.get('description', 'No description')
    paused = rule.get('paused', False)
    status = '⏸️  PAUSED' if paused else '▶️  ACTIVE'
    print(f'  {status} | {action:12s} | {desc}')
" 2>/dev/null || echo "  Could not parse rules"
    else
        echo -e "  ${YELLOW}Could not fetch firewall rules (may need different API endpoint)${NC}"
        # Try rulesets API (newer)
        local rulesets
        rulesets=$(cf_api GET "/zones/${ZONE_ID}/rulesets")
        echo "$rulesets" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    for rs in data.get('result', []):
        print(f'  Ruleset: {rs.get(\"name\", \"unnamed\")} (phase: {rs.get(\"phase\", \"unknown\")})')
else:
    print('  No rulesets found or access denied')
" 2>/dev/null || echo "  Could not fetch rulesets"
    fi
}

# Toggle Bot Fight Mode
toggle_bot_fight_mode() {
    local enable="$1"
    local value=$([ "$enable" = "true" ] && echo "on" || echo "off")
    echo -e "${BLUE}Setting Bot Fight Mode to: ${value}${NC}"

    local response
    response=$(cf_api PATCH "/zones/${ZONE_ID}/settings/bot_fight_mode" "{\"value\":\"${value}\"}")
    local success=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('success', False))" 2>/dev/null || echo "False")

    if [ "$success" = "True" ]; then
        echo -e "  ${GREEN}✅ Bot Fight Mode set to: ${value}${NC}"
    else
        echo -e "  ${YELLOW}⚠️ Could not toggle Bot Fight Mode (may require Enterprise plan)${NC}"
        echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); [print(f'  Error: {e.get(\"message\")}') for e in d.get('errors',[])]" 2>/dev/null || true
    fi
}

# Disable geo-challenge rule
disable_geo_challenge() {
    echo -e "${BLUE}Disabling geo-challenge rules...${NC}"
    local response
    response=$(cf_api GET "/zones/${ZONE_ID}/firewall/rules")
    local success=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('success', False))" 2>/dev/null || echo "False")

    if [ "$success" = "True" ]; then
        # Find and pause geo-challenge rules
        local rule_ids
        rule_ids=$(echo "$response" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for rule in data.get('result', []):
    if 'geo' in rule.get('description', '').lower() or rule.get('action') == 'challenge':
        print(rule['id'])
" 2>/dev/null)

        if [ -z "$rule_ids" ]; then
            echo -e "  ${YELLOW}No geo-challenge rules found${NC}"
            return
        fi

        for rule_id in $rule_ids; do
            local pause_response
            pause_response=$(cf_api PATCH "/zones/${ZONE_ID}/firewall/rules/${rule_id}" '{"paused":true}')
            echo -e "  ${GREEN}✅ Paused rule: ${rule_id}${NC}"
        done
    else
        echo -e "  ${YELLOW}Could not access firewall rules API${NC}"
    fi
}

# Enable geo-challenge rule
enable_geo_challenge() {
    echo -e "${BLUE}Re-enabling geo-challenge rules...${NC}"
    local response
    response=$(cf_api GET "/zones/${ZONE_ID}/firewall/rules")
    local success=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('success', False))" 2>/dev/null || echo "False")

    if [ "$success" = "True" ]; then
        local rule_ids
        rule_ids=$(echo "$response" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for rule in data.get('result', []):
    if 'geo' in rule.get('description', '').lower() or rule.get('action') == 'challenge':
        if rule.get('paused', False):
            print(rule['id'])
" 2>/dev/null)

        if [ -z "$rule_ids" ]; then
            echo -e "  ${YELLOW}No paused geo-challenge rules found${NC}"
            return
        fi

        for rule_id in $rule_ids; do
            local unpause_response
            unpause_response=$(cf_api PATCH "/zones/${ZONE_ID}/firewall/rules/${rule_id}" '{"paused":false}')
            echo -e "  ${GREEN}✅ Unpaused rule: ${rule_id}${NC}"
        done
    else
        echo -e "  ${YELLOW}Could not access firewall rules API${NC}"
    fi
}

# Show full status
show_status() {
    echo "=========================================="
    echo "  WAF Manager Status - daribati.ae"
    echo "=========================================="
    echo ""
    check_bot_fight_mode
    echo ""
    check_waf_rules
    echo ""
    echo "=========================================="
}

# Testing mode: disable protections for E2E
testing_mode() {
    echo "=========================================="
    echo "  Entering TESTING MODE"
    echo "=========================================="
    echo ""
    toggle_bot_fight_mode "false"
    echo ""
    disable_geo_challenge
    echo ""
    echo -e "${GREEN}✅ Testing mode enabled. Remember to re-enable protections!${NC}"
    echo "  Run: $0 production-mode"
}

# Production mode: re-enable all protections
production_mode() {
    echo "=========================================="
    echo "  Entering PRODUCTION MODE"
    echo "=========================================="
    echo ""
    toggle_bot_fight_mode "true"
    echo ""
    enable_geo_challenge
    echo ""
    echo -e "${GREEN}✅ Production mode enabled. All protections active.${NC}"
}

# Main
case "${1:-help}" in
    status|check)
        show_status
        ;;
    disable-geo)
        disable_geo_challenge
        ;;
    enable-geo)
        enable_geo_challenge
        ;;
    disable-bot)
        toggle_bot_fight_mode "false"
        ;;
    enable-bot)
        toggle_bot_fight_mode "true"
        ;;
    testing-mode|test)
        testing_mode
        ;;
    production-mode|prod)
        production_mode
        ;;
    help|*)
        echo "WAF Manager for daribati.ae"
        echo ""
        echo "Usage: $0 <command>"
        echo ""
        echo "Commands:"
        echo "  status           Check current WAF and Bot Fight Mode status"
        echo "  disable-geo      Temporarily disable geo-challenge rule for testing"
        echo "  enable-geo       Re-enable geo-challenge rule after testing"
        echo "  disable-bot      Disable Bot Fight Mode"
        echo "  enable-bot       Enable Bot Fight Mode"
        echo "  testing-mode     Disable all protections for E2E testing"
        echo "  production-mode  Re-enable all protections for production"
        echo ""
        echo "Environment variables:"
        echo "  CLOUDFLARE_API_TOKEN   Cloudflare API token (preferred)"
        echo "  CLOUDFLARE_EMAIL       Cloudflare account email (alternative)"
        echo "  CLOUDFLARE_API_KEY     Cloudflare Global API key (alternative)"
        echo "  CLOUDFLARE_ZONE_ID     Zone ID (default: daribati.ae zone)"
        exit 0
        ;;
esac
