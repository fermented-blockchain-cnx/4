ifndef network
override network = localhost
endif

ifndef contract
override contract = MyOracle
endif


.PHONY: address

address:
	ls -l ../hardhat-ts/generated/deployments/iotexTestnet/*.json
	cat ../hardhat-ts/generated/deployments/iotexTestnet/*.json | jq .address

