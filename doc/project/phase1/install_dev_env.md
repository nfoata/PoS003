Guide: Preparation of his development environment
=================================================

sudo npm install -g express ...
sudo npm install -g @angular/cli
sudo npm install -g typescript

## Concerning Backend

### Step 1: Where I will work ?

```
mkdir backend
cd backend
```

### Step 2: Init the struture

Given you will make a new service/product from scratch,
you will need to bring in prodcution a lot a features
via a project.
So, I will say here init your technical project (and not service)

```
npm init --yes
npm i express
```

### Step 3: Install some useful dependencies

Indeed, do not reinvent the wheel.

```
npm i joi --save
npm i os --save
npm i helmet --save
npm i morgan --save
npm i config --save
npm i debug --save
#npm i mongodb 
npm i mongoose --save
npm i lodash --save
npm i joi-password-complexity --save
npm i bcrypt --save
npm i jsonwebtoken --save
npm i express-async-errors --save
npm i winston@2.4.0 --save
#npm i winston@3.0.0 --save
``̀`

### Step 4: Install the unit test environement

```
npm i jest --save-dev
npm i supertest --save-dev
```

### Step 5: Create a first file and launch the service

```
cat > index.js EOF
console.log('Hello World');
EOF

npm i -g nodemon
```

# Security

# openssl req -nodes -new -x509 -keyout server.key -out server.cert
# openssl req -nodes -new -x509 -keyout server.key -out server.cert
##var fs = require('fs')
var https = require('https')




## Concerning Frontend

### Step 1: Where I will work ? 

```
mkdir frontend
cd frontend
```

### Step 2: Init the structure

```
ng new frontend
cd frontend
ng serve
```

### Step 3: Install some useful dependencies

Indeed, do not reinvent the wheel.

```
npm i --save @angular/cdk
npm i --save @angular/material
npm i --save @angular/animations
```






