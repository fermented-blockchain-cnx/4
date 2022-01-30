ifndef network
override network = localhost
endif

ifndef contract
override contract = MyOracle
endif


.PHONY: setup test action deploy mue typechain

setup:
	hh run scripts/00-setup.js  --network $(network)

deploy:
	hh deploy --network $(network) --tags $(contract)

mue:
	hh run scripts/setup/06-mue.ts --network $(network)

test:
	hh test

node:
	hh node --no-deploy

fresh:
	hh clean && hh compile

abi:
	cat deployments/${network}/${contract}.json | jq .abi | jq
	@cat deployments/${network}/${contract}.json | jq .address
	@cat deployments/${network}/${contract}.json | jq .transactionHash

typechain:
	-rm -Rv typechain
	-rm -Rv ../nzt-web/src/generated/typechain
	hh typechain
	mkdir -p ../nzt-web/src/generated/typechain
	cp -Rv typechain ../nzt-web/src/generated/

action:
	@echo "action! $(foo)"
