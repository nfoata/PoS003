Product: GST Prices API Services
================================

I) Introduction
---------------

* Goal: The goal of this document is to describe
all the available services with their 'features'.


II) Services
------------

# II.1) Service: Price manager

* URI (production):     http://<fqdn>/v1/api/prices
* URI (pre-production): http://preprod.<fqdn>/v1/api/prices
* URI (integration):    http://integ.<fqdn>/v1/api/prices
* URI (recipe):         http://rec.<fqdn>/v1/api/prices

* Description: Each tenant can manage his own prices (CRUD features)

## II.1.A) Create a new price

* The new price must be within the following range [0-1000000000[ and could be decimal
* The creation of new price is only available for the authenticated and autorized tenants

e.g: 
```
curl -X POST -H '
```

## II.1.B) Update a price


