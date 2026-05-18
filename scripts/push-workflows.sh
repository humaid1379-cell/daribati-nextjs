#!/bin/bash
#
# Push Workflow Files to GitHub
# ==============================
#
# The GitHub token used for automation only has 'repo' scope.
# GitHub requires 'workflow' scope to create/modify files in .github/workflows/.
#
# This script pushes the workflow files using a token WITH workflow scope.
#
# Prerequisites:
#   - A GitHub Personal Access Token with 'repo' AND 'workflow' scopes
#   - Git configured with your identity
#
# Usage:
#   export GITHUB_TOKEN="ghp_your_token_with_workflow_scope"
#   bash scripts/push-workflows.sh
#
# Alternative: You can also push manually:
#   1. Clone the repo: git clone https://github.com/humaid1379-cell/daribati-nextjs.git
#   2. Copy workflows: cp workflows-ready/*.yml .github/workflows/
#   3. Also copy the enhanced versions from this directory
#   4. Commit and push with a token that has workflow scope
#

set -euo pipefail

REPO="humaid1379-cell/daribati-nextjs"

if [ -z "${GITHUB_TOKEN:-}" ]; then
    echo "ERROR: GITHUB_TOKEN environment variable is not set"
    echo ""
    echo "You need a Personal Access Token with 'repo' AND 'workflow' scopes."
    echo "Create one at: https://github.com/settings/tokens/new"
    echo "Required scopes: repo, workflow"
    echo ""
    echo "Then run:"
    echo "  export GITHUB_TOKEN='ghp_your_token'"
    echo "  bash scripts/push-workflows.sh"
    exit 1
fi

# Configure git remote with token
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

echo "📁 Working in: $PROJECT_DIR"

# Set up remote with new token
git remote set-url origin "https://${GITHUB_TOKEN}@github.com/${REPO}.git"

# Ensure .github/workflows directory exists
mkdir -p .github/workflows

# Copy workflow files
echo "📋 Copying workflow files..."
cp workflows-ready/ci-cd.yml .github/workflows/ci-cd.yml 2>/dev/null || true
cp workflows-ready/domain-sync-verify.yml .github/workflows/domain-sync-verify.yml 2>/dev/null || true
cp workflows-ready/waf-monitor.yml .github/workflows/waf-monitor.yml 2>/dev/null || true

# Also use the enhanced ci-cd.yml if it exists in the local .github/workflows
# (This script directory may have the enhanced version)

echo "📝 The following workflow files will be pushed:"
ls -la .github/workflows/

# Stage and commit
git add .github/workflows/
if git diff --cached --quiet; then
    echo "ℹ️  No changes to commit - workflows may already be in place"
    exit 0
fi

git commit -m "ci: activate GitHub Actions workflows

- CI/CD pipeline with lint, type-check, build, deploy
- Arabic spell check pre-deployment
- Cloudflare cache purge post-deployment
- Domain sync verification (scheduled)
- WAF monitoring (scheduled)
- Lighthouse CI performance checks"

echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Workflow files pushed successfully!"
echo ""
echo "Verify at: https://github.com/${REPO}/actions"
echo ""
echo "Note: Workflows will trigger on the next push to main or PR."
