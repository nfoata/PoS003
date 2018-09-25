#!/bin/bash

echo "Step 0) Check the configuration"
juju version          # Version of juju
juju clouds           # Idem as juju list-clouds
juju show-cloud aws   # Check AWS cloud configuration
juju list-regions aws # See the available AWS regions with their identifier
juju set-default-region aws us-west-2  # Cheaper region
juju credentials --format yaml --show-secrets   # Check the current credentials
juju add-credential aws -f my_credentials.yaml  # With me (nfoata) and bob
juju remove-credential aws bob                  # Remote Bob account
juju set-default-credential aws nfoata          # Set the default user to use
ls ~/.local/share/juju/                         # Configuration folder

echo "Step 1) Launch a controller within an AWS region"
juju bootstrap aws my-aws-controller    # Launch a controller service        
juju status --format yaml               # Check the status (pending, started ...)
juju ssh 0                              # Connect in ssh by specifyng the machine id

echo "Step 2) Launch a GUI for managing juju within this region"
juju deploy juju-gui   # Deploy the service
juju gui               # See the login and password to connect on the GUI

echo "Step 3) Deploy the Database layer with MongoDB"
juju deploy mongodb  my-mongodb-service # Launch and name my service with 1 instance
juju add-unit -n 2   my-mongodb-service # Add two instances to my service
juju ssh my-mongo-service/0             # Connect on my 1st instance and check mongo
juju ssh my-mongo-service/1             # Connect on my 2nd instance and check mongo
juju ssh my-mongo-service/2             # Connect on my 3rd instance and check mongo

echo "Step 4) Deploy the Business logic layer with NodeJS"
#juju deploy nodejs(path to my repo)
juju add-relation nodejs mongodb

echo "Step 5) Deploy the Load Balancer with HAProxy"
juju deploy ha-proxy
juju add-relation ha-proxy nodejs
juju expose ha-proxy

echo "Step 6) Deploy the Monitoring with Ganglia"
juju deploy ganglia
juju expose ganglia

echo "Step 7) Deploy the client for the monitoring"
juju deploy ganglia-node
juju add-relation ganglia:node ganglia-node:node
juju add-relation ganglia-node mongodb
juju add-relation ganglia-node nodejs

exit 0
