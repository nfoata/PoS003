#!/bin/bash
echo "Step 0) Refresh the package lists"
sudo apt-get update

echo "Step 1) Install NodeJS and check version"
sudo apt install nodejs
nodejs -v

echo "Step 2) Install NPM and check version"
sudo apt install npm
npm -v

# https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04

exit 0
