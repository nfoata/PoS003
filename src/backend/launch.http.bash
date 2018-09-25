#!/bin/bash
export NODE_ENV=production
export DEBUG=app:*
export PRIVATE_KEY=something
nodemon index.http.js
