# secret-agent
Secret agent is in the isolated country nearby, where exactly ?

Good morning, agent. MI6 is trying to gather statistics about its missions. Your mission, should you decide to accept it, has two parts:

## Endpoint: GET /countries-by-isolation

An isolated agent is defined as an agent that participated in a single mission.this endpoint will find the most isolated country (the country with the highest degree of isolation).

For the sample input (see [db-setup script](https://github.com/danfromisrael/secret-agent/blob/master/scripts/db-setup.js)) input:

- Brazil has 1 isolated agent (008) and 2 non-isolated agents (007, 005)
- Poland has 2 isolated agents (011, 013) and one non-isolated agent (005)
- Morocco has 3 isolated agents (002, 009, 003) and one non-isolated agent (007)

So the result is Morocco with an isolation degree of 3.

## Endpoint: POST /find-closest
	Body: { “target-location”: “[a address or geo coordinates]”
Will Find the closest and farthest missions from a specific address (it uses Google API for this)

# How to run the service

## Docker

For Production:

`docker-compose up`


For Development:

`docker-compose -f docker-compose.dev.yml up`

* Will activate shared volume of host directory inside the container
* Watches the files as development takes place
* Server restarts for each change

Wanna just compose it and bash into the container without starting the service ?
you got it!

`docker-compose -f docker-compose.dev.yml run web bash`

just go in there and do whatever you feel like -> you got full control
