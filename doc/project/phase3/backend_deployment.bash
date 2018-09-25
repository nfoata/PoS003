
sudo npm i-g firebase-tools
firebase login 


git init
vim .gitignore <<EOF
nodes_modules/
coverage/
EOF

heroku login
heroku create
heroku config set:PRIVATE_KEY=toto
heroku config set:NODE_ENV=production
heroku logs --tail
