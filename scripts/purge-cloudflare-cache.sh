#!/bin/bash
#
# Purge Cloudflare Cache for daribati.ae
# =======================================
#
# Usage:
#   export CLOUDFLARE_API_TOKEN="your-token"
#   bash scripts/purge-cloudflare-cache.sh [all|urls]
#
# Examples:
#   bash scripts/purge-cloudflare-cache.sh all
#   bash scripts/purge-cloudflare-cache.sh urls "https://daribati.ae/" "https://daribati.ae/pricing"
#

set -euo pipefail

DOMAIN="daribati.ae"
API_BASE="https://api.cloudflare.com/client/v4"

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
    echo "ERROR: CLOUDFLARE_API_TOKEN environment variable is not set"
    exit 1
fi

# Get Zone ID
ZONE_ID=$(curl -s -X GET \
    "${API_BASE}/zones?name=${DOMAIN}" \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -H "Content-Type: application/json" | \
    python3 -c "import sys,json; data=json.load(sys.stdin); print(data['result'][0]['id'] if data.get('result') else '')")

if [ -z "$ZONE_ID" ]; then
    echo "ERROR: Could not find zone for ${DOMAIN}"
    exit 1
fi

echo "Zone ID: ${ZONE_ID}"

case "${1:-all}" in
    all)
        echo "Purging ALL cache for ${DOMAIN}..."
        RESPONSE=$(curl -s -X POST \
            "${API_BASE}/zones/${ZONE_ID}/purge_cache" \
            -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
            -H "Content-Type: application/json" \
            -d '{"purge_everything": true}')
        ;;
    urls)
        shift
        if [ $# -eq 0 ]; then
            echo "ERROR: No URLs provided"
            echo "Usage: $0 urls URL1 URL2 ..."
            exit 1
        fi
        # Build JSON array of URLs
        URLS_JSON=$(printf '%s\n' "$@" | python3 -c "import sys,json; print(json.dumps([l.strip() for l in sys.stdin]))")
        echo "Purging cache for specific URLs: $URLS_JSON"
        RESPONSE=$(curl -s -X POST \
            "${API_BASE}/zones/${ZONE_ID}/purge_cache" \
            -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
            -H "Content-Type: application/json" \
            -d "{\"files\": ${URLS_JSON}}")
        ;;
    *)
        echo "Usage: $0 [all|urls URL1 URL2 ...]"
        exit 1
        ;;
esac

SUCCESS=$(echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success', False))")

if [ "$SUCCESS" = "True" ]; then
    echo "✅ Cache purged successfully!"
else
    echo "❌ Cache purge failed:"
    echo "$RESPONSE" | python3 -m json.tool
    exit 1
fi
