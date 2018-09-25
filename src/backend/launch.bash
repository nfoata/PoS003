#!/bin/bash
export NODE_ENV=production
export DEBUG=app:*
export PRIVATE_KEY=something
npm start || node index.js
