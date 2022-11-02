async function main() {
  [owner, signer2, signer3] = await ethers.getSigners();

  SsayCoin = await ethers.getContractFactory('SsayCoin', owner);
  ssayCoin = await SsayCoin.deploy();

  Crowdsale = await ethers.getContractFactory('Crowdsale', owner);
  crowdSale = await Crowdsale.deploy(2, owner.address, ssayCoin.address);

  await ssayCoin.connect(owner).mint(
    crowdSale.address,
    ethers.utils.parseEther('10000')
  )

  console.log("Crowdsale:",      crowdSale.address);
  console.log("SsayCoin:",       ssayCoin.address);
  console.log("signer2:",        signer2.address);
}

// npx hardhat run --network localhost scripts/deploy.js

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });