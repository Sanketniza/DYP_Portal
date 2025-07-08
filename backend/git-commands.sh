# Change directory to your repository root
cd d:\DYP_Portal

# First, stash any uncommitted changes to save them
git stash push -m "backup_before_revert"

# Check the commit history to identify where to revert to
git log --oneline

# Reset to the commit before the 5 problematic commits (f464234)
# This will remove the last 5 commits: 2b42b07, 930d463, a6c76af, 8ea09ac, 9822368
git reset --hard f464234

# Force push to overwrite the remote repository
# WARNING: This will permanently remove the 5 commits from the remote repository
git push -f origin main

# If you want to restore your stashed changes later, use:
# git stash pop

# After reverting, start your backend server to test
cd d:\DYP_Portal\backend
npm run dev

# In another terminal, test an API endpoint
# curl http://localhost:3000/api/v1/user

# Start your backend server
cd d:\DYP_Portal\backend
npm run dev

# In another terminal, test an API endpoint
curl http://localhost:3000/api/v1/user