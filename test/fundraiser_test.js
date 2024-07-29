const { expect } = require("chai");
const { loadFixture }  = require("@nomicfoundation/hardhat-network-helpers")
//contract("Fundraiser", accounts =>{
const { web3}  = require("web3");
//const { ethers }= require("ethers");

describe("An even higher test", async function() {

let fundraiser = null;
//  beforeEach(async function() {
async function runEveryTime(){
  const owners = await ethers.getSigners();
  const name =  "Beneficiary Name";
  const url = "beneficiaryname.org";
  const imageURL = "https://placekitten.com/600/350";
  const description = "Beneficiary description";
  const beneficiary = owners[1];
  const owner = owners[0];
  const fundr = await ethers.getContractFactory("Fundraiser");
  const fundraiser = await fundr.deploy(name,url,imageURL,description, beneficiary, owner);
  await fundraiser.waitForDeployment();
  return { fundraiser }
  };

describe("Fundraiser", function () {


  it("Contract has been deployed successfully", async function () {
	const accounts = await ethers.getSigners();
	const value = await ethers.parseUnits('1.0', 'ether')
	console.log("value = ",value)
	const donor = accounts[2];
	const { fundraiser }  = await loadFixture(runEveryTime);
	expect(fundraiser , "contract has been deployed");
	expect(await fundraiser.name()).to.equal("Beneficiary Name");
	expect(await fundraiser.url()).to.equal("beneficiaryname.org");
	expect(await fundraiser.imageURL()).to.equal("https://placekitten.com/600/350");
	expect(await fundraiser.description()).to.equal("Beneficiary description");
});


});


  describe("making donations",  function()  {
//  const { fundraiser }  = await loadFixture(runEveryTime);
//    const accounts = await ethers.getSigners();
//    const value = web3.utils.toWei('0.0289');
//    const donor = accounts[2];
    it("increases myDonationsCountx", async function()  {
   
//https://stackoverflow.com/questions/70955495/how-do-i-accurately-convert-eth-to-wei-when-sending-transaction
    const accounts = await ethers.getSigners();
// /   const value = web3.utils.toWei('0.0289');

console.log("just before my call")

// 'ether' in this case is the starting unit where
// the 'parse units ' converts to wei
const value = await ethers.parseUnits('0.0289','ether')
const value1 = await ethers.parseUnits('1.0', 'ether')



	    //const value  = ethers.formatUnits("0.0289","ether")
console.log("value = ",value)
// the 'donor' account is giving an 'invalid argument'
const donor = accounts[2];
const { fundraiser }  = await loadFixture(runEveryTime);
const currentDonationsCount = await fundraiser.myDonationsCount({from: accounts[0]});
await fundraiser.donate({from: accounts[0], value: value1});
const newDonationsCount = await fundraiser.myDonationsCount({from: accounts[0]});
expect(1).to.equal(newDonationsCount - currentDonationsCount);
    });

it("includes donation in myDonations", async () => {
    

    const accounts = await ethers.getSigners();
// /   const value = web3.utils.toWei('0.0289');
console.log("just before my call")

// 'ether' in this case is the starting unit where
// the 'parse units ' converts to wei
const value = await ethers.parseUnits('0.0289','ether')
const value1 = await ethers.parseUnits('1.0', 'ether')
const { fundraiser }  = await loadFixture(runEveryTime);
    await fundraiser.donate({from: accounts[0], value1});
      const {values, dates} = await fundraiser.myDonations(
        {from: accounts[0]}
      );
console.log("value1", value1)
	console.log("values[0]", values[0])


	//   expect(value1).to.equal(await values[0]);
//   expect(dates[0]);
});

    it("increases totaldonations amount", async () => {
         const accounts = await ethers.getSigners();
         // /   const value = web3.utils.toWei('0.0289');
         console.log("just before my call")

         // 'ether' in this case is the starting unit where
         // the 'parse units ' converts to wei
         const value = await ethers.parseUnits('0.0289','ether')
         const value1 = await ethers.parseUnits('1.0', 'ether')
         const { fundraiser }  = await loadFixture(runEveryTime);
         const currentTotalDonations = await fundraiser.totalDonations();
         await fundraiser.donate({from: accounts[0],value:  value1});
         const newTotalDonations = await fundraiser.totalDonations();
         console.log("currentTotalDonations", currentTotalDonations)
         console.log("newTotalDonations", newTotalDonations)
         const diff = newTotalDonations - currentTotalDonations;
         expect(diff).to.equal(value1)


    });


 describe("setBeneficiary", async function()  {

   it("updated beneficiary when called by owner account", async function() {

          const accounts = await ethers.getSigners();
          const owners   = await ethers.getSigners();
          const newBeneficiary = accounts[2];
          const value = await ethers.parseUnits('0.0289','ether')
          const value1 = await ethers.parseUnits('1.0', 'ether')
          const { fundraiser }  = await loadFixture(runEveryTime);
          await fundraiser.setBeneficiary(newBeneficiary, {from: owners[0]});
          const actualBeneficiary = await fundraiser.beneficiary();
          expect(actualBeneficiary).to.equal(newBeneficiary);
    });
   it("throws and error when called from a non-owner account", async function()  {
      try {
        await fundraiser.setBeneficiary(newBeneficiary, {from: accounts[3]});
        expect.fail("withdraw was not restricted to owners")
      } catch(err) {
        const expectedError = "Ownable: caller is not the owner"
        const actualError = err.reason;
        expect(actualError).to.equal( expectedError)
      }
    });





 });
  });

});



