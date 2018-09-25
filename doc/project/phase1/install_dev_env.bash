#!/bin/bash

# Create the folder for our service and go in
mkdir backend
cd backend
npm init --yes
npm i express
npm i joi
npm i helmet
npm i morgan
npm i config
npm i debug
npm i mongodb
npm i mongoose
npm i lodash
npm i joi-password-complexity
npm i bcrypt
npm i jsonwebtoken
npm i express-async-errors
npm i winston@2.4.0
npm i winston@3.0.0
npm i jest --save-dev
npm i supertest --save-dev
cat > index.js <<EOF
console.log('Hello world');
EOF

npm i -g nodemon
npm i jest --save-dev





#export NODE_ENV=production
#export DEBUG=app:startup,app:db
#export DEBUG=app:*
#export PRIVATE_KEY=toto
#DEBUG=app:* nodemon index.js
#mongoimport --db prices --collection mymodel --drop --file ....
