import { BigNumber, ContractTransaction, Signer } from 'ethers';
// import { getNamedAccounts } from 'hardhat';
import { PawatNon } from '../typechain';
const fetch = require('node-fetch');
const hre = require('hardhat');
async function main() {
    let accounts: Signer[] = await hre.ethers.getSigners();
    let contract: PawatNon;

    contract = (await hre.ethers.getContract('PawatNon')) as PawatNon;
    console.log(await contract.name())

    const tx = await contract.setName("Pawat Non");
    tx.wait();

    console.log(await contract.name())


}

if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
} else {
    module.exports = main;
}
