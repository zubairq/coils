nexe src/electron.js -r public/ -r src/ -r package.json -r node_sqlite3_macos64.rename  -o appshare
mv ./pilot ../nexe/appshare
chmod +x ../nexe/appshare
