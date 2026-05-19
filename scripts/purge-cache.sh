#!/bin/bash
# =============================================================================
# Cloudflare Cache Purge Script
# =============================================================================
# Purges Cloudflare cache for daribati.ae
#
# Usage:
#   ./scripts/purge-cache.sh all              - Purge everything
#   ./scripts/purge-cache.sh urls URL1 URL2   - Purge specific URLs
#
# Required environment variables:
#   CLOUDFLARE_API_TOKEN or (CLOUDFLARE_EMAIL + CLOUDFLARE_API_KEY)
#   CLOUDFLARE_ZONE_ID (optional, defaults to daribati.ae zone)
# =============================================================================

set -euo pipefail

ZONE_ID="${CLOUDFLARE_ZONE_ID:-9da22a778f96f90dc21cdb7e1886d260}"
API_BASE="https://api.cloudflare.com/client/v4"

# Determine auth headers
make_request() {
    local data="$1"

    if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
        curl -s -X POST \
            "${API_BASE}/zones/${ZONE_ID}/purge_cache" \
            -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
            -H "Content-Type: application/json" \
            -d "$data"
    elif [ -n "${CLOUDFLARE_EMAIL:-}" ] && [ -n "${CLOUDFLARE_API_KEY:-}" ]; then
        curl -s -X POST \
            "${API_BASE}/zones/${ZONE_ID}/purge_cache" \
            -H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" \
            -H "X-Auth-Key: ${CLOUDFLARE_API_KEY}" \
            -H "Content-Type: application/json" \
            -d "$data"
    else
        echo "ERROR: No Cloudflare credentials found."
        echo "Set CLOUDFLARE_API_TOKEN or (CLOUDFLARE_EMAIL + CLOUDFLARE_API_KEY)"
        exit 1
    fi
}

case "${1:-all}" in
    all)
        echo "Purging all cache for zone ${ZONE_ID}..."
        RESPONSE=$(make_request '{"purge_everything":true}')
        ;;
    urls)
        shift
        if [ $# -eq 0 ]; then
            echo "ERROR: No URLs provided"
            echo "Usage: $0 urls URL1 URL2 ..."
            exit 1
        fi
        URLS_JSON=$(printf '%s\n' "$@" | python3 -c "import sys,json; print(json.dumps([l.strip() for l in sys.stdin if l.strip()]))")
        echo "Purging cache for: $URLS_JSON"
        RESPONSE=$(make_request "{\"files\": ${URLS_JSON}}")
        ;;
    *)
        echo "Usage: $0 [all|urls URL1 URL2 ...]"
        exit 1
        ;;
esac

SUCCESS=$(echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success', False))" 2>/dev/null || echo "False")

if [ "$SUCCESS" = "True" ]; then
    echo "✅ Cache purged successfully!"
else
    echo "❌ Cache purge failed:"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
    exit 1
fi
