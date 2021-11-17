// // const { utils } = require("ethers").utils;
// const { expect } = require("chai");
// const { ethers, waffle } = require("hardhat");
// // const { waffle } = require("hardhat");
// // const { deployContract } = waffle;
// // const { expectRevert, time, BN } = require('@openzeppelin/test-helpers');
// // const { deployContract, loadFixture } = waffle;

// describe(
//   "PreVoodooSales",
//   function () {

//     const ONE = 1;
//     const HUNDRED = 100;
//     const THOUSAND = 1000;
//     const MILLION = 1000000;
//     const BILLION = 1000000000;

//     // Wallets
//     let deployer;
//     let buyer1;
//     let saleProceeds;

//     // Contracts
//     let PreVoodooTokenContract;
//     let poly;

//     let PreVoodooSaleContract;
//     let sale;

//     let DAITokenContract;
//     let dai;

//     // let WBTCTokenContract;
//     // let wbtc;

//     // let UniswapV2FactoryContract;
//     // let factory;

//     // let UniswapV2EouterContract;
//     // let router;

//     // let UniswapV2Pair;
//     // let daitEthPairl
//     // let ethWBTCPair;

//     beforeEach(
//       async function () {
//         [
//           deployer,
//           buyer1,
//           saleProceeds
//         ] = await ethers.getSigners();

//         console.log( "Test::PreVoodoo::beforeEach:01 deployer address is %s.", deployer.address );
//         console.log( "Test::PreVoodoo::beforeEach:02 buyer1 address is %s.", buyer1.address );

//         console.log( "Test::PreVoodoo::beforeEach:03 Loading PreVoodooToken." );
//         PreVoodooTokenContract = await ethers.getContractFactory("PreVoodooToken");

//         console.log( "Test::PreVoodoo::beforeEach:04 Deploying PreVoodooToken." );
//         poly = await PreVoodooTokenContract.connect( deployer ).deploy();
//         // await poly.deployed();
//         console.log( "Test::PreeVoodooSale:beforeEach:05 PreVoodooToken address is %s,", poly.address );

//         console.log( "Test::PreeVoodooSale::beforeEach:06 Loading DAI." );
//         DAITokenContract = await ethers.getContractFactory("DAI");

//         console.log( "Test::PreeVoodooSale::beforeEach:07 Deploying DAI." );
//         dai = await DAITokenContract.connect( deployer ).deploy( 1 );
//         await dai.deployed();
//         console.log( "Test::PreeVoodooSale:beforeEach:08 DAI address is %s,", dai.address );

        
//         console.log( "Test::PreeVoodooSale::beforeEach:09 Loading PreVoodooSales." );
//         PreVoodooSaleContract = await ethers.getContractFactory("PreVoodooSales");
        
//         console.log( "Test::PreeVoodooSale::beforeEach:10 Deploying PreVoodooSales." );
//         sale = await PreVoodooSaleContract.connect( deployer ).deploy();
//         // await sale.deployed();
//         console.log( "Test::PreeVoodooSale:beforeEach:11 PreVoodooSale address is %s,", sale.address );

        
//         console.Console( "Test::PreeVoodooSale::beforeEach:12 Initializing OLYIntrinsicCalculator." );
//         await sale.initialize( poly.address, dai.address, 100, saleProceeds.address );

//         console.Console( "Test::PreeVoodooSale::beforeEach:13 Minting DAI." );
//         dai.connect(deployer).mint( buyer1.address, ethers.utils.parseUnits( String( MILLION ), "ether" ) );

//         console.Console( "Test::PreeVoodooSale::beforeEach:13 Minting pOLY." );
//         poly.connect(deployer).mint( sale.address, ethers.utils.parseUnits( String( BILLION ), "ether" ) );

//       }
//     );

//     describe(
//       "Sale",
//       function () {
//         it( 
//           "DAIPurchase",
//           async function() {

//             console.log("Test::PreeVoodooSale::Sale::DAIPurchase:01 buyer1 dai balanceOf.");
//             expect( await dai.connect(deployer).balanceOf( buyer1.address ) )
//               .to.equal( String( ethers.utils.parseUnits( String( MILLION ), "ether" ) ) );

//             console.log("Test::PreeVoodooSale::Sale::DAIPurchase:02 sale poly balanceOf.");
//             expect( await poly.connect(deployer).balanceOf( sale.address ) )
//               .to.equal( String( ethers.utils.parseUnits( String( BILLION ), "ether" ) ) );

//             await sale.connect(deployer).approveBuyer( buyer1.address );

//               await expect( dai.connect(buyer1).approve( sale.address, ethers.utils.parseUnits( String( MILLION ), "ether" ) ) )
//               .to.emit( dai, "Approval" )
//               .withArgs( buyer1.address, sale.address, ethers.utils.parseUnits( String( MILLION ), "ether" ) );

//             expect( await dai.connect(buyer1).allowance( buyer1.address, sale.address ) )
//               .to.equal( ethers.utils.parseUnits( String( MILLION ), "ether" ) );

//             // await expect( sale.connect(buyer1).buyPOly( ethers.utils.parseUnits( String( 100 ), "ether" ) ) )
//             //   .to.be.revertedWith( "Sale is not active." );

//               // expect( await dai.connect(buyer1).allowance( buyer1.address, sale.address ) )
//               // .to.equal( ethers.utils.parseUnits( String( 100 ), "ether" ) );

//             // await sale.connect(deployer).startSale();
            
//             console.log("Test::PreeVoodooSale::Sale::DAIPurchase:03 Approve sale to sell.");
//             await poly.connect(deployer).addApprovedSeller( sale.address );

//             console.log("Test::PreeVoodooSale::Sale::DAIPurchase:04 sale is approvedSeller.");
//             expect( await poly.isApprovedSeller( sale.address ) ).to.equal( true );

//             // await expect( dai.connect(buyer1).approve( sale.address, ethers.utils.parseUnits( String( 100 ), "ether" ) ) )
//             //   .to.emit( dai, "Approval" )
//             //   .withArgs( buyer1.address, sale.address, ethers.utils.parseUnits( String( 100 ), "ether" ) );

//             // expect( await dai.connect(buyer1).allowance( buyer1.address, sale.address ) )
//             //   .to.equal( ethers.utils.parseUnits( String( 100 ), "ether" ) );

//             await expect( () => sale.connect(buyer1).buyPOly( ethers.utils.parseUnits( String( MILLION ), "ether" ) ) )
//               .to.changeTokenBalance( poly, buyer1, ethers.utils.parseUnits( String( (MILLION * 100) ), "ether" ) );

            
//               console.log("Test::PreeVoodooSale::Sale::DAIPurchase:05 buyer1 dai balanceOf.");
//               expect( await dai.connect(deployer).balanceOf( buyer1.address ) )
//                 .to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//             // expect( await poly.connect(buyer1).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 1000 ), "ether" ) ) );
            
//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//             // expect( await dai.connect(buyer1).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 900 ), "ether" ) ) );

//             /*****************************************************************************************************************************************************/

//             // poly.connect(deployer).transfer( sale.address, ethers.utils.parseUnits( String( 1000000000 ), "ether" ) );

//             // dai.connect(deployer).transfer( buyer1.address, ethers.utils.parseUnits( String( 1000 ), "ether" ) );

//             /******************************************************************************************************************************/

//             // console.log("Test::PreVoodooSaleDeployment::DeploymentSuccess: token name.");
//             // expect( await poly.name() ).to.equal("PreVoodoo");

//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: token symbol.");
//             // expect( await poly.symbol() ).to.equal("pOLY");

//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: token decimals.");
//             // expect( await poly.decimals() ).to.equal(18);

//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: owner.");
//             // expect( await poly.owner() ).to.equal(deployer.address);
            
//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: Confirm minting enabled.");
//             // expect( await poly.connect( deployer ).allowMinting() ).to.equal( true );

//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: Confirm seller approval enabled.");
//             // expect( await poly.connect( deployer ).requireSellerApproval() ).to.equal( true );

            
            
//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: poly is approvedSeller.");
//             // expect( await poly.isApprovedSeller(poly.address) ).to.equal( true );
            
//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//             // expect( await poly.isApprovedSeller( ethers.constants.AddressZero ) ).to.equal( true );
            
//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//             // expect( await poly.isApprovedSeller( buyer1.address ) ).to.equal( false );
            
//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//             // expect( await poly.isApprovedSeller( buyer2.address ) ).to.equal( false );

//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: totalSupply.");
//             // expect( await poly.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) );

//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: owner balanceOf.");
//             // expect( await poly.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) );

//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//             // expect( await poly.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//             // console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//             // expect( await poly.connect(deployer).balanceOf(buyer2.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );
//           }
//         );
//       }
//     );

//     // describe(
//     //   "PreVoodooTokenOwnership",
//     //   function () {
//     //     // it( 
//     //     //   "Minting", 
//     //     //   async function() {
            
//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirm minting enabled.");
//     //     //     expect( await poly.connect( deployer ).allowMinting() )
//     //     //       .to.equal( true );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: buyer1 can't mint.");
//     //     //     await expect( poly.connect(buyer1).mint( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith("Ownable: caller is not the owner");
            
//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: only owner can mint.");
//     //     //     await expect( () => poly.connect(deployer).mint( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, deployer, ethers.utils.parseUnits( String( 1000000000 ), "ether" ) );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: totalSupply.");
//     //     //     expect( await poly.totalSupply() )
//     //     //       .to.equal( ethers.utils.parseUnits( String( 2000000000 ), "ether" ) );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: owner balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 2000000000 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Disable minting.");
//     //     //     await poly.connect( deployer ).disableMinting();
            
//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Disabled minting.");
//     //     //     expect( await poly.connect( deployer ).allowMinting() ).to.equal( false );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: owner can't mint.");
//     //     //     await expect( poly.connect( deployer ).mint( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Minting has been disabled." );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: totalSupply.");
//     //     //     expect( await poly.totalSupply() )
//     //     //       .to.equal( ethers.utils.parseUnits( String( 2000000000 ), "ether" ) );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: owner balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 2000000000 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: buyer1 can't mint.");
//     //     //     await expect( poly.connect(buyer1).mint(ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Ownable: caller is not the owner" );
            
//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );
//     //     //   }
//     //     // );
//     //   }
//     // );

//     // describe(
//     //   "PreVoodooTokenOwnership",
//     //   function () {

//     //     // it( 
//     //     //   "Post-Deployment Transfer", 
//     //     //   async function() {

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: owner is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller(deployer.address) ).to.equal( true );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: poly is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller(poly.address) ).to.equal( true );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( ethers.constants.AddressZero ) ).to.equal( true );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( buyer1.address ) ).to.equal( false );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( buyer2.address ) ).to.equal( false );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: totalSupply.");
//     //     //     expect( await poly.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: owner balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer2.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: Confirm seller approval required.");
//     //     //     expect( await poly.requireSellerApproval() ).to.equal( true );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming buyer1 can't transfer to buyer1 because they have no balance.");
//     //     //     await expect( poly.connect(buyer1).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PreVoodooTokenOwnershi::Minting: Confirming buyer1 can't transfer to buyer2 because they have no balance.");
//     //     //     await expect( poly.connect(buyer1).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming buyer2 can't transfer to buyer1 because they have no balance.");
//     //     //     await expect( poly.connect(buyer2).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming buyer2 can't transfer to buyer2 because they have no balance.");
//     //     //     await expect( poly.connect(buyer2).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming deployer can transfer to buyer1.");
//     //     //     await expect( () => poly.connect(deployer).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, buyer1, ethers.utils.parseUnits( String( 250000000 ), "ether" ) );
            
//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming deployer can transfer to buyer1.");
//     //     //     await expect( () => poly.connect(deployer).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, buyer2, ethers.utils.parseUnits( String( 250000000 ), "ether" ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: deployer balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 500000000 ), "ether" ) ) );
              
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(buyer1).balanceOf(buyer1.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(buyer2).balanceOf(buyer2.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //   }
//     //     // );

//     //     // it( 
//     //     //   "Approved Seller Transfer", 
//     //     //   async function() {

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: owner is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller(deployer.address) ).to.equal( true );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: poly is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller(poly.address) ).to.equal( true );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( ethers.constants.AddressZero ) ).to.equal( true );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( buyer1.address ) ).to.equal( false );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( buyer2.address ) ).to.equal( false );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: totalSupply.");
//     //     //     expect( await poly.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: owner balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer2.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

    

//     //     //     /*************************************************************************** */
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: Confirm seller approval required.");
//     //     //     expect( await poly.requireSellerApproval() ).to.equal( true );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming buyer1 can't transfer to buyer1 because they have no balance.");
//     //     //     await expect( poly.connect(buyer1).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PreVoodooTokenOwnershi::Minting: Confirming buyer1 can't transfer to buyer2 because they have no balance.");
//     //     //     await expect( poly.connect(buyer1).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming buyer2 can't transfer to buyer1 because they have no balance.");
//     //     //     await expect( poly.connect(buyer2).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming buyer2 can't transfer to buyer2 because they have no balance.");
//     //     //     await expect( poly.connect(buyer2).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming deployer can transfer to buyer1.");
//     //     //     await expect( () => poly.connect(deployer).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, buyer1, ethers.utils.parseUnits( String( 250000000 ), "ether" ) );
            
//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming deployer can transfer to buyer1.");
//     //     //     await expect( () => poly.connect(deployer).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, buyer2, ethers.utils.parseUnits( String( 250000000 ), "ether" ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: deployer balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 500000000 ), "ether" ) ) );
              
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(buyer1).balanceOf(buyer1.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(buyer2).balanceOf(buyer2.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Enable open trading of pOLY.");
//     //     //     await poly.connect( deployer ).allowOpenTrading();

            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: Confirm seller approval required.");
//     //     //     expect( await poly.requireSellerApproval() ).to.equal( false );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: only owner can mint.");

//     //     //     expect( await poly.connect(buyer1).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     // Don't know why this doesn't work.
//     //     //     // await expect( () => poly.connect(buyer1).transfer( buyer2.address, poly.connect(deployer).balanceOf(buyer1.address) ) )
//     //     //     //   .to.changeTokenBalance( poly, buyer1, ethers.utils.parseUnits( String( 0 ), "ether" ) )
//     //     //     //   .to.changeTokenBalance( poly, buyer2, ethers.utils.parseUnits( String( 500000000 ), "ether" ) );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer2.address) ).to.equal( String( ethers.utils.parseUnits( String( 500000000 ), "ether" ) ) );
//     //     //   }
//     //     // );

//     //     // it( 
//     //     //   "Open Transfer", 
//     //     //   async function() {

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: owner is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller(deployer.address) ).to.equal( true );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: poly is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller(poly.address) ).to.equal( true );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( ethers.constants.AddressZero ) ).to.equal( true );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( buyer1.address ) ).to.equal( false );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( buyer2.address ) ).to.equal( false );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: totalSupply.");
//     //     //     expect( await poly.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: owner balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer2.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: Confirm seller approval required.");
//     //     //     expect( await poly.requireSellerApproval() ).to.equal( true );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming buyer1 can't transfer to buyer1 because they have no balance.");
//     //     //     await expect( poly.connect(buyer1).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PreVoodooTokenOwnershi::Minting: Confirming buyer1 can't transfer to buyer2 because they have no balance.");
//     //     //     await expect( poly.connect(buyer1).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming buyer2 can't transfer to buyer1 because they have no balance.");
//     //     //     await expect( poly.connect(buyer2).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming buyer2 can't transfer to buyer2 because they have no balance.");
//     //     //     await expect( poly.connect(buyer2).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming deployer can transfer to buyer1.");
//     //     //     await expect( () => poly.connect(deployer).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, buyer1, ethers.utils.parseUnits( String( 250000000 ), "ether" ) );
            
//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Confirming deployer can transfer to buyer1.");
//     //     //     await expect( () => poly.connect(deployer).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, buyer2, ethers.utils.parseUnits( String( 250000000 ), "ether" ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: deployer balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 500000000 ), "ether" ) ) );
              
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(buyer1).balanceOf(buyer1.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(buyer2).balanceOf(buyer2.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: Enable open trading of pOLY.");
//     //     //     await poly.connect( deployer ).allowOpenTrading();

            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: Confirm seller approval required.");
//     //     //     expect( await poly.requireSellerApproval() ).to.equal( false );

//     //     //     console.log("Test::PreVoodooTokenOwnership::Minting: only owner can mint.");

//     //     //     expect( await poly.connect(buyer1).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     // Don't know why this doesn't work.
//     //     //     // await expect( () => poly.connect(buyer1).transfer( buyer2.address, poly.connect(deployer).balanceOf(buyer1.address) ) )
//     //     //     //   .to.changeTokenBalance( poly, buyer1, ethers.utils.parseUnits( String( 0 ), "ether" ) )
//     //     //     //   .to.changeTokenBalance( poly, buyer2, ethers.utils.parseUnits( String( 500000000 ), "ether" ) );
            
//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//     //     //     console.log("Test::PreVoodooTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer2.address) ).to.equal( String( ethers.utils.parseUnits( String( 500000000 ), "ether" ) ) );
//     //     //   }
//     //     // );
//     //   }
//     // );
//   }
// );