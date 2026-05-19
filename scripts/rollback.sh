#!/bin/bash
# =============================================================================
# Tool 10 Supporting Script: Manual Rollback
# =============================================================================
# Manually rolls back to a previous Cloudflare Pages deployment
#
# Usage:
#   ./scripts/rollback.sh                    - Rollback to previous deployment
#   ./scripts/rollback.sh <deployment_id>    - Rollback to specific deployment
#   ./scripts/rollback.sh list               - List recent deployments
#
# Required environment variables:
#   CLOUDFLARE_API_TOKEN
#   CLOUDFLARE_ACCOUNT_ID
# =============================================================================

set -euo pipefail

ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-42111d1e6d43aa2fe6c9e165a56e8fd7}"
PROJECT_NAME="daribati-nextjs"
API_BASE="https://api.cloudflare.com/client/v4"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
    echo -e "${RED}ERROR: CLOUDFLARE_API_TOKEN is required${NC}"
    exit 1
fi

# List recent deployments
list_deployments() {
    echo -e "${BLUE}Recent deployments for ${PROJECT_NAME}:${NC}"
    echo ""

    RESPONSE=$(curl -s -X GET \
        "${API_BASE}/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments?sort_by=created_on&sort_order=desc&per_page=10" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json")

    echo "$RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if not data.get('success'):
    print('  Error fetching deployments')
    sys.exit(1)

print(f'  {\"#\":<4} {\"ID\":<40} {\"Commit\":<10} {\"Status\":<10} {\"Created\":<25}')
print(f'  {\"-\"*4} {\"-\"*40} {\"-\"*10} {\"-\"*10} {\"-\"*25}')

for i, deploy in enumerate(data.get('result', [])):
    deploy_id = deploy.get('id', 'unknown')
    commit = deploy.get('deployment_trigger', {}).get('metadata', {}).get('commit_hash', 'unknown')[:8]
    status = deploy.get('latest_stage', {}).get('status', 'unknown')
    created = deploy.get('created_on', 'unknown')[:19]
    marker = ' ← current' if i == 0 else ''
    print(f'  {i+1:<4} {deploy_id:<40} {commit:<10} {status:<10} {created}{marker}')
"
}

# Perform rollback
do_rollback() {
    local deploy_id="$1"
    echo -e "${BLUE}Rolling back to deployment: ${deploy_id}${NC}"
    echo ""

    # Try rollback endpoint
    RESPONSE=$(curl -s -X POST \
        "${API_BASE}/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments/${deploy_id}/rollback" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json")

    SUCCESS=$(echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success', False))" 2>/dev/null || echo "False")

    if [ "$SUCCESS" = "True" ]; then
        echo -e "${GREEN}✅ Rollback initiated successfully!${NC}"
        echo ""
        echo "The previous deployment is now being promoted to production."
        echo "It may take 1-2 minutes for changes to propagate globally."
    else
        echo -e "${RED}❌ Rollback failed:${NC}"
        echo "$RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for e in data.get('errors', []):
    print(f'  Error: {e.get(\"message\", \"Unknown\")}')
" 2>/dev/null || echo "$RESPONSE"

        echo ""
        echo "Try using the retry endpoint instead..."
        RETRY_RESPONSE=$(curl -s -X POST \
            "${API_BASE}/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments/${deploy_id}/retry" \
            -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
            -H "Content-Type: application/json")
        RETRY_SUCCESS=$(echo "$RETRY_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success', False))" 2>/dev/null || echo "False")
        if [ "$RETRY_SUCCESS" = "True" ]; then
            echo -e "${GREEN}✅ Retry/redeploy initiated successfully!${NC}"
        else
            echo -e "${RED}❌ Both rollback and retry failed. Manual intervention required.${NC}"
            exit 1
        fi
    fi
}

# Main
case "${1:-}" in
    list|ls)
        list_deployments
        ;;
    "")
        # Rollback to previous deployment
        echo "Fetching previous deployment..."
        RESPONSE=$(curl -s -X GET \
            "${API_BASE}/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments?sort_by=created_on&sort_order=desc&per_page=2" \
            -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
            -H "Content-Type: application/json")

        PREV_ID=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['result'][1]['id'])" 2>/dev/null || echo "")

        if [ -z "$PREV_ID" ]; then
            echo -e "${RED}ERROR: Could not find previous deployment${NC}"
            exit 1
        fi

        echo "Previous deployment ID: $PREV_ID"
        do_rollback "$PREV_ID"
        ;;
    *)
        # Rollback to specific deployment ID
        do_rollback "$1"
        ;;
esac
