sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4                                                  # GPG key for security
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list     # MongoDB sources.list

sudo apt-get update                   # Refresh the available packages
sudo apt-get install -y mongodb-org   # Install MongoDB

ls /var/lib/mongodb/                  # Data storage
ls /var/log/mongodb/                  # Logs
ls/etc/mongodb.conf                   # Main configuration file

sudo service mongod start             # Start the MongoDB deamon
sudo service mongod stop              # Stop the MongoDB deamon

mongo --host 127.0.0.1:27017          # Start a MongoDB client shell