#!/bin/zsh

ls -l ../hardhat-ts/generated/deployments/iotexTestnet/*.json
cat ../hardhat-ts/generated/deployments/iotexTestnet/*.json | jq .address
