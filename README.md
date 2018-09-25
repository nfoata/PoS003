# A simple platform of services

* Description: Fun test


I) Platform of Services
========================

I.1) Tiers: Database Layer
--------------------------

What
* Database name: MongoDB
* Database type: NoSQL / Key-Document
* Database version: ...

How
* Installation on Windows 10
* Installation on Ubuntu Bionic 18.04
* Installation on the Cloud AWS 
* Create an account on mLab and use


I.2) Tiers: Business Logic
--------------------------

What
* A NodeJS application with express framework (Backend on V8)
* An API (http or https) for managing the end users and prices

How
* Installation of npm, node
* Deployment on Heroku or on the AWS cloud

I.3) Tiers: User Interface
--------------------------

What
* A web user interface with Angular and Angular Material

How
* Installation of angular framework
* Deployment on Github.io or on the AWS cloud


I.4) All tiers
--------------

What
* The full deployment of the Plateform

How
* Ubuntu Juju for launching all the services
(Load balancer, front-ends, back-ends, seveal MongoDB instances
and the monitoring)
* Docker if anough time or in the future



II) Testing
===========

Play with it, on your computer (here Ubuntu 18.04 LTS - Bionic)

II.1) Step 1: MongoDB
---------------------

* Launch MongoDB

```
# Launch the deamon/server
sudo service mongod start

# Launch the mongo client
mongo
show dbs # To see the available databases

# Use this database if already exists (otherwise it will be created after)
use exos
show collections # To see the collections within the DB exos
db.<collection-name>.find().toArray() # to see all the documents in the <collection-name>

```

II.2) Step 2: Backend
---------------------

The sources of the backend are in this repository within the following folder


### II.2.A) Launch the backend server

```
src/backend/

# If you not have install yet (and if I didn't put the node_modules on Github
that is a bad practice to put useless and big libraries)
npm install

# To launch the application the following will failed
# given this application will need some important environement variables
# npm start (fail)
# node index.js (fail)
# To avoid these failure, export

# SOLUTION 1
export PRIVATE_KEY=tata 
node index.js

# SOLUTION 2
# or faster (db localhost)
./launch_dev.bash

# Production environement with mLab MongoDB
./launch.bash

# You can launch this server in http or https (with certificates)

```

### II.2.B) Create a End User

* And now, start to test the API with cURL (or Postman)

```
# In HTTP, create anew account with the following command
curl -i -H 'Content-Type: application/json' -i -X POST http://localhost:2802/api/v1/tenants/ -d '{"firstname":"Nicolas","lastname":"FOATA","email":"nic.foatai@gmail.com","password":"1234"}'
  
# In HTTPs, use the same command but add --cacert <./security/file.cer> , --insecure and use https
curl -i --cacert ./security/server.cer --insecure -H 'Content-Type: application/json' -i -X POST https://localhost:2802/api/v1/tenants/ -d '{"firstname":"Nicolas","lastname":"FOATA","email":"nic.foatai@gmail.com","password":"1234"}'

# The answer looks like if everything ges well
HTTP/1.1 201 Created
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,PUT,PATCH,POST,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin
Access-Control-Allow-Credentials: true
Accept-Type: application/json
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE4ODE5NzBhMzlkZjQxM2EyY2E5OTUiLCJpYXQiOjE1Mzc3Njk4ODR9.XTl9ACFFLNwnhMgMFHyTW3qql2EUa1uSnaG_CIIuJy4
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-OuoLv7pOwrsV57KsOYSK5tc4KJo"
Date: Mon, 24 Sep 2018 06:18:04 GMT
Connection: keep-alive

{"_id":"5ba881970a39df413a2ca995","firstname":"Nicolas","lastname":"FOATA","email":"nic.foatai@gmail.com","password":"$2b$10$YL6l374Wt/Q58fOxfmEP5eLeCN8ZM6yJps7OGjq2usjHXtHzAxbKC","creationDate":"2018-09-24T06:17:59.306Z","lastModificationDate":"2018-09-24T06:17:59.306Z","__v":0}

# As you can seen, you have a HTTP code 201 
# (the user has been created and you receive the Mongo ObjectID of this entry document
# From now we can sign in within this application with our email and secret password used

```

### II.2.C) Sign-in with your new end-user and retrieve your token

```
curl -i --cacert ./security/server.cer --insecure -H 'Content-Type: application/json' -i -X POST https://localhost:2802/api/v1/auths/ -d '{"email":"nic.foatai@gmail.com","password":"1234"}'

HTTP/1.1 200 OK
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,PUT,PATCH,POST,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin
Access-Control-Allow-Credentials: true
Accept-Type: application/json
Content-Type: application/json; charset=utf-8
Content-Length: 161
ETag: W/"a1-QOMTYs6AmAxXn5vFVEUTcDQ83YA"
Date: Mon, 24 Sep 2018 06:27:52 GMT
Connection: keep-alive

{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE4ODE5NzBhMzlkZjQxM2EyY2E5OTUiLCJpYXQiOjE1Mzc3NzA0NzJ9.Lq2xNmBJzR_oiaZUSZCU8qHUgD5aI5Kfnz5EKU7GOgU"}

```

### II.2.D) Add a price without GST and the total amount (here AUD,no need of currency)

```
curl -i --cacert ./security/server.cer --insecure -H 'Content-Type: application/json' -H 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE4ODE5NzBhMzlkZjQxM2EyY2E5OTUiLCJpYXQiOjE1Mzc3NzA0NzJ9.Lq2xNmBJzR_oiaZUSZCU8qHUgD5aI5Kfnz5EKU7GOgU' -X POST https://localhost:2802/api/v1/prices/ -d '{"price":100.23}'

HTTP/1.1 201 Created
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,PUT,PATCH,POST,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin
Access-Control-Allow-Credentials: true
Accept-Type: application/json
Content-Type: application/json; charset=utf-8
Content-Length: 117
ETag: W/"75-rhD//xNbvOMY62SN0c0p1HWVljg"
Date: Mon, 24 Sep 2018 06:39:15 GMT
Connection: keep-alive

{"_id":"5ba886920a39df413a2ca996","price":100.2300033569336,"creationDate":"2018-09-24T06:39:14.594Z","__v":0}

```

Remark: Now you can connect on the database and check that the price is well here

```
mongo
use exos
show collections
db.prices.find().toArray() 
# You can use the objectID if you want to filter on it 
# but the command is less fast given we have only one price document/entry at this step
```

For the after needs, I will add two others prices:
```
curl -i --cacert ./security/server.cer --insecure -H 'Content-Type: application/json' -H 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE4ODE5NzBhMzlkZjQxM2EyY2E5OTUiLCJpYXQiOjE1Mzc3NzA0NzJ9.Lq2xNmBJzR_oiaZUSZCU8qHUgD5aI5Kfnz5EKU7GOgU' -X POST https://localhost:2802/api/v1/prices/ -d '{"price":50}'

# {"_id":"5ba892a20a39df413a2ca997","price":50,"creationDate":"2018-09-24T07:30:42.120Z","__v":0}

curl -i --cacert ./security/server.cer --insecure -H 'Content-Type: application/json' -H 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE4ODE5NzBhMzlkZjQxM2EyY2E5OTUiLCJpYXQiOjE1Mzc3NzA0NzJ9.Lq2xNmBJzR_oiaZUSZCU8qHUgD5aI5Kfnz5EKU7GOgU' -X POST https://localhost:2802/api/v1/prices/ -d '{"price":1000}'

# {"_id":"5ba892ca0a39df413a2ca998","price":1000,"creationDate":"2018-09-24T07:31:22.397Z","__v":0}

```


### II.2.E) Update a price (add GST and total amount)

Remark: the total can be obtain by a simple addition, so we are not obliged to store it or the GST
But here, I will store all given it doesn't take too much storage.

```
curl -i --cacert ./security/server.cer --insecure -H 'Content-Type: application/json' -H 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE4ODE5NzBhMzlkZjQxM2EyY2E5OTUiLCJpYXQiOjE1Mzc3NzA0NzJ9.Lq2xNmBJzR_oiaZUSZCU8qHUgD5aI5Kfnz5EKU7GOgU' -X PUT https://localhost:2802/api/v1/prices/5ba886920a39df413a2ca996 -d '{"price":100.23,"gst":10.02,"total":110.25}'

HTTP/1.1 200 OK
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,PUT,PATCH,POST,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin
Access-Control-Allow-Credentials: true
Accept-Type: application/json
Content-Type: application/json; charset=utf-8
Content-Length: 117
ETag: W/"75-rhD//xNbvOMY62SN0c0p1HWVljg"
Date: Mon, 24 Sep 2018 07:24:13 GMT
Connection: keep-alive

{"_id":"5ba886920a39df413a2ca996","price":100.2300033569336,"creationDate":"2018-09-24T06:39:14.594Z","__v":0}

```

### II.2.F) See all my prices

```
curl -i --cacert ./security/server.cer --insecure -H 'Content-Type: application/json' -H 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE4ODE5NzBhMzlkZjQxM2EyY2E5OTUiLCJpYXQiOjE1Mzc3NzA0NzJ9.Lq2xNmBJzR_oiaZUSZCU8qHUgD5aI5Kfnz5EKU7GOgU' -X GET https://localhost:2802/api/v1/prices/'

EORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,PUT,PATCH,POST,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin
Access-Control-Allow-Credentials: true
Accept-Type: application/json
Content-Type: application/json; charset=utf-8
Content-Length: 2
ETag: W/"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w"
Date: Mon, 24 Sep 2018 07:47:35 GMT
Connection: keep-alive

[{"_id":"5ba89c5630fd2248450dec57","price":600,"creationDate":"2018-09-24T08:12:06.113Z","tenantId":"5ba881970a39df413a2ca995","__v":0},{"_id":"5ba89be9ac58e847b70b193b","price":700,"creationDate":"2018-09-24T08:10:17.920Z","tenantId":"5ba881970a39df413a2ca995","__v":0}]
```

### II.2.G) Delete a price

```
curl -i --cacert ./security/server.cer --insecure -H 'Content-Type: application/json' -H 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE4ODE5NzBhMzlkZjQxM2EyY2E5OTUiLCJpYXQiOjE1Mzc3NzA0NzJ9.Lq2xNmBJzR_oiaZUSZCU8qHUgD5aI5Kfnz5EKU7GOgU' -X DELETE https://localhost:2802/api/v1/prices/5ba89c5630fd2248450dec57

HTTP/1.1 204 No Content
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,PUT,PATCH,POST,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin
Access-Control-Allow-Credentials: true
Accept-Type: application/json
ETag: W/"86-nzyhsQAkZu4qdwlELRDu+ZpjrBI"
Date: Mon, 24 Sep 2018 08:22:40 GMT
Connection: keep-alive

# The last value of the delete is missing, To do
```

Remark: to check redo the GET request or go into the DB


### II.2.H) Delete all my prices

```
curl -i --cacert ./security/server.cer --insecure -H 'Content-Type: application/json' -H 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE4ODE5NzBhMzlkZjQxM2EyY2E5OTUiLCJpYXQiOjE1Mzc3NzA0NzJ9.Lq2xNmBJzR_oiaZUSZCU8qHUgD5aI5Kfnz5EKU7GOgU' -X DELETE https://localhost:2802/api/v1/prices/

HTTP/1.1 204 No Content
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,PUT,PATCH,POST,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin
Access-Control-Allow-Credentials: true
Accept-Type: application/json
ETag: W/"10f-3+1q3VPJTfIC3bLlfnTLDFgqKrk"
Date: Mon, 24 Sep 2018 08:25:32 GMT
Connection: keep-alive

# Idem
```

Remark: to check redo the GET request or go into the DB


To Do:
- double certificates between front-end and back-end
- load balancers between backend <-> db and between front-end <-> backend
- otherwise docker compose a stack node must have at least one ui, api, mongo in localhost call to avoid traffic and LB in front
- design a web service for the monitoring
- design roles
- Put the JWT token in the correct Header with Bearer
- Pagination
- Tests
- TDD
- Make clean config files and env variables
- CORs activation within a config file and not just in the middle of the code by default
- Remove boolean has GST
- implement lastModificationDate
- implement patch
- implement better log system for analysis on the ws



openssl req -x509 -newkey rsa:4096 -keyout server_key.pem -out server_cert.pem -nodes -days 365 -subj "/CN=localhost/O=Client\ Certificate\ Demo"
