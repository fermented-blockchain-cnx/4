import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { getNamedAccounts, deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const accounts = await hre.ethers.getSigners();
    await deploy('MySimpleContract', {
        from: deployer,
        args: ['Hello'],
        log: true,
    });
};
export default func;
func.tags = ['MySimpleContract'];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/
