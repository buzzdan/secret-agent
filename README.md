# secret-agent
Secret agent is in the isolated country nearby, where exactly ?

# How to run the service

## Docker

For Production:

`docker-compose up`


For Development:

`docker-compose -f docker-compose.dev.yml up`

* Will activate share volume of host directory inside the container
* Watches the files as development takes place
* Server restarts for each change