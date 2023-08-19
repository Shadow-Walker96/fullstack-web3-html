/*
// // Important Notice

// // Continuation LESSON 7: Hardhat fundme ---> continuation from 11:08:36 Testing Fund Me which is the 
// // repository hardhat-fund-me-fcc

// // i created another repository similar to -> hardhat-fund-me-fcc
// // because am having issues with running test

// // so what i intended in this repository is that, i will use the repository from the lesson 7 section by
// // cloning it, since the test is working perfectly. i concluded with this because i have done everything 
// // possible by creating different repository and testing them to see where the fault is from.
// // so i guess it will be the package version currently is not compactable with the code in the lession 7

// // so what i will do is that i will cotinue from the last repository which is --> 11:08:36 Testing Find Me

// ///////////////////////////////////////////////////////////

// // 11:08:36 --> Testing FundMe, i just splitted it 1.

// // Here we create a variable for deployer and extract it differently
// // we create a variable for mockV3Aggregator

const { assert } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)

        // We need our MockV3Aggregator since we will deploy locally
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer,
        )
    })

    // We want to write test for our constructor
    describe("constructor", async function () {
        it("sets the aggregator addressed correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)

        })
    })
})

*/

/*

// // 11:18:46 --> Testing FundMe, we want to write test for fund()

// const { assert } = require("chai")
// const { deployments, ethers, getNamedAccounts } = require("hardhat")

// describe("FundMe", async function () {
//     let fundMe
//     let deployer
//     let mockV3Aggregator

//     beforeEach(async function () {
//         deployer = (await getNamedAccounts()).deployer
//         await deployments.fixture(["all"])
//         fundMe = await ethers.getContract("FundMe", deployer)

//         // We need our MockV3Aggregator since we will deploy locally
//         mockV3Aggregator = await ethers.getContract(
//             "MockV3Aggregator",
//             deployer,
//         )
//     })

//     // We want to write test for our constructor
//     describe("constructor", async function () {
//         it("sets the aggregator addressed correctly", async function () {
//             const response = await fundMe.priceFeed()
//             assert.equal(response, mockV3Aggregator.address)
//         })
//     })

//     // We want to write test for our fund()
//     describe("fund", async function () {
//         // This line would check if there is enough ether tobe sent --> `require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");`
//         it("Fails if you dont send enough ETH", async function () {
//             await fundMe.fund() 
//             // --> When we run yarn hardhat test at this point it would display this ----> Error: VM Exception while processing transaction: reverted with reason string 'You need to spend more ETH!'
//             // so we want the test to pass bcos we want to test if there is no ETH,
//              // so we want to tell our test net that it sould pass the test if there in no ETH specified
//             // so what we will do is that we would use `ethereum-waffle` to tell the test that it is owk to pass the test if there is no ETH
//         })
//     })
// })

// */

// /*
// // 11:20:06 --> Testing FundMe, we want to write test for fund(), we would use ethereum-waffle
// // Here we need to note that we dont need to import ethereum-waffle bcos chai is over-written with waffle
// // that is to say there is ethereum-waffle inside chai

// const { assert, expect } = require("chai")
// const { deployments, ethers, getNamedAccounts } = require("hardhat")

// describe("FundMe", async function () {
//     let fundMe
//     let deployer
//     let mockV3Aggregator

//     beforeEach(async function () {
//         deployer = (await getNamedAccounts()).deployer
//         await deployments.fixture(["all"])
//         fundMe = await ethers.getContract("FundMe", deployer)

//         mockV3Aggregator = await ethers.getContract(
//             "MockV3Aggregator",
//             deployer,
//         )
//     })

//     describe("constructor", async function () {
//         it("sets the aggregator addressed correctly", async function () {
//             const response = await fundMe.priceFeed()
//             assert.equal(response, mockV3Aggregator.address)
//         })
//     })

//     // We want to write test for our fund(), we would use ethereum-waffle which is included in chai so we dont need to import ethereum-waffle
//     describe("fund", async function () {
//         it("Fails if you dont send enough ETH", async function () {
//             await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!")
//         })
//     })
// })

// */

/*
// // 11:21:05 --> Testing FundMe, we want write test to update the amount funded in the data structure
// // we want to update this ---> addressToAmountFunded[msg.sender] += msg.value;

const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    // here we can hardcode the value of ETH like this
    // const sendValue = '1000000000000000000' // 1 ETH

    // Or we can use the ethers utility
    // so parseEther("1"), the 1 is converted to 1000000000000000000
    const sendValue = ethers.utils.parseEther("1") // 1 ETH

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)

        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer,
        )
    })

    describe("constructor", async function () {
        it("sets the aggregator addressed correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })

    describe("fund", async function () {
        it("Fails if you dont send enough ETH", async function () {
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!",
            )
        })
        // we want to write test that when the user send fund the account it would be
        // updated i.e ---> addressToAmountFunded
        it("update the amount funded data structure", async function () {
            await fundMe.fund({ value: sendValue })
            const response = await fundMe.addressToAmountFunded(deployer) // this line here maps the address of the deployer which is the one that call the fund() and maps the address to addressToAmountFunded, i.e mapping(address => uint256) public addressToAmountFunded;
            assert.equal(response.toString(), sendValue.toString()) // we use toString() bcos remember that solidity and javascript dosent do well with number and the value it would return will be a BigNumber ie '1000000000000000000'
        
        })
    })
    // when we run yarn hardhat coverage, we would see that the percentage has increased which means we have done some test for our contract
})
*/

// /*
// // 11:24:00 --> Testing FundMe, we want write test for putting the funders in the funders array
// // i.e ---> funders.push(msg.sender);

// const { assert, expect } = require("chai")
// const { deployments, ethers, getNamedAccounts } = require("hardhat")

// describe("FundMe", async function () {
//     let fundMe
//     let deployer
//     let mockV3Aggregator

//     const sendValue = ethers.utils.parseEther("1")

//     beforeEach(async function () {
//         deployer = (await getNamedAccounts()).deployer
//         await deployments.fixture(["all"])
//         fundMe = await ethers.getContract("FundMe", deployer)

//         mockV3Aggregator = await ethers.getContract(
//             "MockV3Aggregator",
//             deployer,
//         )
//     })

//     describe("constructor", async function () {
//         it("sets the aggregator addressed correctly", async function () {
//             const response = await fundMe.priceFeed()
//             assert.equal(response, mockV3Aggregator.address)
//         })
//     })

//     describe("fund", async function () {
//         it("Fails if you dont send enough ETH", async function () {
//             await expect(fundMe.fund()).to.be.revertedWith(
//                 "You need to spend more ETH!",
//             )
//         })

//         it("update the amount funded data structure", async function () {
//             await fundMe.fund({ value: sendValue })
//             const response = await fundMe.addressToAmountFunded(deployer)
//             assert.equal(response.toString(), sendValue.toString())
//         })

//         it("Adds funder to array of funders", async function () {
//             await fundMe.fund({value: sendValue})
//             const funder = await fundMe.funders(0) // here funders(0), the 0 means the first index which is the deployer address
//             assert.equal(funder, deployer) // here the msg.sender is the deployer i.e --> funders.push(msg.sender);
//         })
//     })
// })
// */

// /*
// // 11:25:15 --> Testing FundMe, we want write test for withdraw function
// // i.e ---> withdraw()

// const { assert, expect } = require("chai")
// const { deployments, ethers, getNamedAccounts } = require("hardhat")

// describe("FundMe", async function () {
//     let fundMe
//     let deployer
//     let mockV3Aggregator

//     const sendValue = ethers.utils.parseEther("1")

//     beforeEach(async function () {
//         deployer = (await getNamedAccounts()).deployer
//         await deployments.fixture(["all"])
//         fundMe = await ethers.getContract("FundMe", deployer)

//         mockV3Aggregator = await ethers.getContract(
//             "MockV3Aggregator",
//             deployer,
//         )
//     })

//     describe("constructor", async function () {
//         it("sets the aggregator addressed correctly", async function () {
//             const response = await fundMe.priceFeed()
//             assert.equal(response, mockV3Aggregator.address)
//         })
//     })

//     describe("fund", async function () {
//         it("Fails if you dont send enough ETH", async function () {
//             await expect(fundMe.fund()).to.be.revertedWith(
//                 "You need to spend more ETH!",
//             )
//         })

//         it("update the amount funded data structure", async function () {
//             await fundMe.fund({ value: sendValue })
//             const response = await fundMe.addressToAmountFunded(deployer)
//             assert.equal(response.toString(), sendValue.toString())
//         })

//         it("Adds funder to array of funders", async function () {
//             await fundMe.fund({ value: sendValue })
//             const funder = await fundMe.funders(0)
//             assert.equal(funder, deployer)
//         })
//     })

//     // Remember that in the withdraw function only the owner of contract get the money to withdraw
//     describe("withdraw", async function () {
//         // B4 we test the withdraw function they has to be money in the contract
//         // So we will have another beforeEach that will automatically fund the contract
//         beforeEach(async function () {
//             await fundMe.fund({ value: sendValue })
//         })

//         it("withdraw ETH from a single founder", async function () {
//             // Here we would split our test into ---> Arrange, Act, Assert

//             // Arrange ---> first we need to get the starting balance of the fundMe contract and the starting balance of the deployer

//              // Here we can also do this ->> const startingFundMeBalance = await ethers.provider.getBalance(fundMe.address)
//              // But we use  await fundMe.provider.getBalance(fundMe.address) bcos we are using the provider of the fundMe contract

//             const startingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             ) // starting balance of fundMe contract

//             const startingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             ) // starting balance of the deployer

//              // The reason why we need both startingFundMeBalance and startingDeployerBalance is bcos we want to compare it to the
//              // ending balances i.e endingFundMeBalance, endingDeployerBalance to see if the money went to the right places

//
//             // Act ---> Second we will run the withdraw function
//             const transactionResponse = await fundMe.withdraw() // Here we call the withdraw function
//             const transactionReceipt = await transactionResponse.wait(1) // here we want for 1 block confirmation

//             const endingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address,
//             ) // The balance after the withdraw of the fundMe contract

//             const endingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer,
//             ) // The balance after the withdraw of the deployer

//             // Assert
//             assert.equal(endingFundMeBalance, 0)

//             // Note here --> startingFundMeBalance + startingDeployerBalance should be written like this startingFundMeBalance.add(startingDeployerBalance)
//             // The reason for the .add() is bcos startingFundMeBalance is calling from the blockchain and is regarded as a BigNumber i.e "1000000000000000000"
//             // also it advisable to convert toString() i.e toString() convert the value to BigNumber and BigNumber is "1000000000000000000"

//             // Also another note is that remember that when the deployer calls the withdraw function, the deployer spent an amount of gas for the transaction
//             // That is why we did .add(gasCost) which is the same as =  endingDeployerBalance + gasCost
//              // And also we converted using toString() since its a BigNumber
//              assert.equal(
//                 startingFundMeBalance.add(startingDeployerBalance).toString(),
//                 endingDeployerBalance.add(gasCost).toString(),
//             )
//         })
//     })

//     // Important notice here is that we have not run ---> yarn hardhat test
//     // we would continue from here ---> 11:30:38 Breakpoint & Debugging
// })

// */

/*
// 11:30:38 --->  Breakpoint & Debugging
// Here we want to figure out how we will get the gasCost from the transactionResponse and we will now put it in our assert test
// in the endingDeployerBalance
// we can get the gasCost from the transactionReceipt and we can do some trick in visual studio code

// I placed a breakpoint which is a red dot on exactly line 436 

// All the explanation to go about it is very simple in visual studio and i have written it in my book

// At this point i didnt run --> yarn hardhat test


const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    const sendValue = ethers.utils.parseEther("1")

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)

        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer,
        )
    })

    describe("constructor", async function () {
        it("sets the aggregator addressed correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })

    describe("fund", async function () {
        it("Fails if you dont send enough ETH", async function () {
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!",
            )
        })

        it("update the amount funded data structure", async function () {
            await fundMe.fund({ value: sendValue })
            const response = await fundMe.addressToAmountFunded(deployer)
            assert.equal(response.toString(), sendValue.toString())
        })

        it("Adds funder to array of funders", async function () {
            await fundMe.fund({ value: sendValue })
            const funder = await fundMe.funders(0)
            assert.equal(funder, deployer)
        })
    })

    describe("withdraw", async function () {
        beforeEach(async function () {
            await fundMe.fund({ value: sendValue })
        })

        it("withdraw ETH from a single founder", async function () {
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            ) 
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            ) 

            const transactionResponse = await fundMe.withdraw() 
            const transactionReceipt = await transactionResponse.wait(1) 

            // Here we want to figure out how we will get the gasCost from the transactionResponse and we will now put it in our assert test
            // in the endingDeployerBalance
            // we can get the gasCost from the transactionReceipt and we can do some trick in visual studio code


            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            ) 

            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer,
            ) 

            assert.equal(endingFundMeBalance, 0)

            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
            )
        })
    })
})
*/

/*

// 11:33:39 --->  Gas III
// Here we want to pull out the gasUsed and the effectiveGasPrice from the transaction receipt variable
// Remember that gasCost = gasUsed * effectiveGasPrice

const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    const sendValue = ethers.utils.parseEther("1")

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)

        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer,
        )
    })

    describe("constructor", async function () {
        it("sets the aggregator addressed correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })

    describe("fund", async function () {
        it("Fails if you dont send enough ETH", async function () {
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!",
            )
        })

        it("update the amount funded data structure", async function () {
            await fundMe.fund({ value: sendValue })
            const response = await fundMe.addressToAmountFunded(deployer)
            assert.equal(response.toString(), sendValue.toString())
        })

        it("Adds funder to array of funders", async function () {
            await fundMe.fund({ value: sendValue })
            const funder = await fundMe.funders(0)
            assert.equal(funder, deployer)
        })
    })

    describe("withdraw", async function () {
        beforeEach(async function () {
            await fundMe.fund({ value: sendValue })
        })

        it("withdraw ETH from a single founder", async function () {
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            ) 
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            ) 

            const transactionResponse = await fundMe.withdraw() 
            const transactionReceipt = await transactionResponse.wait(1)
            
            // Here we want to pull out the gasUsed and the effectiveGasPrice from the transaction receipt variable
            // Remember that gasCost = gasUsed * effectiveGasPrice
            const { gasUsed, effectiveGasPrice } = transactionReceipt
            
            // gasUsed.mul(effectiveGasPrice) is the same as gasUsed * effectiveGasPrice
            // and we used .mul() bcos its a BigNumber
            const gasCost  = gasUsed.mul(effectiveGasPrice)

            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            ) 

            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer,
            ) 

            assert.equal(endingFundMeBalance, 0)


            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
            )
        })
    })
})

*/

/*
// 11:36:39 ---> console.log & debugging

// When running your contracts and tests on Hardhat Network you can print logging messages and contract 
// variables calling console.log() from your Solidity code. To use it you have to 
// import hardhat/console.sol in your contract code.
// This is what it looks like:

// pragma solidity ^0.8.0;

// import "hardhat/console.sol";

// contract Token {
//   //...
// }

// Patrick said we should try it out ourselves which i did 
// I added some things in my FundMe.sol 
// after i have done that 
// i ran ---> yarn hardhat test, Bingo it worked 

// Here is what it displayed 

// Compiling 2 files with 0.8.8
// Solidity compilation finished successfully

//   FundMe
//     constructor
//       ✓ sets the aggregator addressed correctly
//     fund
//       ✓ Fails if you dont send enough ETH
// Display the address of the sender 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
//       ✓ update the amount funded data structure
// Display the address of the sender 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
//       ✓ Adds funder to array of funders
//     withdraw
// Display the address of the sender 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
//       ✓ withdraw ETH from a single founder


//   5 passing (557ms)

// Done in 4.39s.

const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    const sendValue = ethers.utils.parseEther("1")

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)

        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer,
        )
    })

    describe("constructor", async function () {
        it("sets the aggregator addressed correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })

    describe("fund", async function () {
        it("Fails if you dont send enough ETH", async function () {
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!",
            )
        })

        it("update the amount funded data structure", async function () {
            await fundMe.fund({ value: sendValue })
            const response = await fundMe.addressToAmountFunded(deployer)
            assert.equal(response.toString(), sendValue.toString())
        })

        it("Adds funder to array of funders", async function () {
            await fundMe.fund({ value: sendValue })
            const funder = await fundMe.funders(0)
            assert.equal(funder, deployer)
        })
    })

    describe("withdraw", async function () {
        beforeEach(async function () {
            await fundMe.fund({ value: sendValue })
        })

        it("withdraw ETH from a single founder", async function () {
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            ) 
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            ) 

            const transactionResponse = await fundMe.withdraw() 
            const transactionReceipt = await transactionResponse.wait(1)
            
            const { gasUsed, effectiveGasPrice } = transactionReceipt
            
            const gasCost  = gasUsed.mul(effectiveGasPrice)

            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            ) 

            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer,
            ) 

            assert.equal(endingFundMeBalance, 0)


            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
            )
        })
    })
})

*/

/*
// 11:37:31 ---> Testing Fund Me II
// We want to test the withdraw() ETH when there is multiple funders

const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    const sendValue = ethers.utils.parseEther("1")

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)

        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer,
        )
    })

    describe("constructor", async function () {
        it("sets the aggregator addressed correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })

    describe("fund", async function () {
        it("Fails if you dont send enough ETH", async function () {
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!",
            )
        })

        it("update the amount funded data structure", async function () {
            await fundMe.fund({ value: sendValue })
            const response = await fundMe.addressToAmountFunded(deployer)
            assert.equal(response.toString(), sendValue.toString())
        })

        it("Adds funder to array of funders", async function () {
            await fundMe.fund({ value: sendValue })
            const funder = await fundMe.funders(0)
            assert.equal(funder, deployer)
        })
    })

    describe("withdraw", async function () {
        beforeEach(async function () {
            await fundMe.fund({ value: sendValue })
        })

        it("withdraw ETH from a single founder", async function () {
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address,
            )
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer,
            )

            const transactionResponse = await fundMe.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)

            const { gasUsed, effectiveGasPrice } = transactionReceipt

            const gasCost = gasUsed.mul(effectiveGasPrice)

            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address,
            )

            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer,
            )

            assert.equal(endingFundMeBalance, 0)

            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString(),
            )
        })

        // We want to test the withdraw() ETH when there is multiple funders
        it("Allows us to withdraw with multiple funders", async function () {
            // Remember that we will split our test in three sections which is  ---> Arrange, Act, Assert

            // Arrange
            const accounts = await ethers.getSigners() // Here we get all the signers which is the accounts of different client that calls it

            // Here we loop through all the account
            for (let i = 1; i < 6; i++) { 
                // The reason why we did fundMe.connect() is bcos currently our fundMe contract is
                // connected to the deployer --> fundMe = await ethers.getContract("FundMe", deployer)
                // And anytime we call any transaction with the fundMe, the deployer is the one that is
                // Calling that function

                // So we need an object which will connect to all different account
                const fundMeConnectedContract = await fundMe.connect(
                    accounts[i],
                )
                await fundMeConnectedContract.fund({ value: sendValue })
            }
                const startingFundMeBalance = await fundMe.provider.getBalance(
                    fundMe.address,
                )
                const startingDeployerBalance =
                    await fundMe.provider.getBalance(deployer)

                // Act
                const transactionResponse = await fundMe.withdraw()
                const transactionReceipt = await transactionResponse.wait(1)

                const { gasUsed, effectiveGasPrice } = transactionReceipt

                const gasCost = gasUsed.mul(effectiveGasPrice)

                // Assert
                const endingFundMeBalance = await fundMe.provider.getBalance(
                    fundMe.address,
                )

                const endingDeployerBalance = await fundMe.provider.getBalance(
                    deployer,
                )

                assert.equal(endingFundMeBalance, 0) 

                assert.equal(
                    startingFundMeBalance
                        .add(startingDeployerBalance)
                        .toString(),
                    endingDeployerBalance.add(gasCost).toString(),
                )

                // Here We want to make sure that the funders are reset properly
                await expect(fundMe.funders(0)).to.be.reverted // this is from our solidity code which reset the funders array to be empty --> funders = new address[](0);

                // We also want to reset our mapping which is this to zero ---> addressToAmountFunded[funder] = 0;
                for (i = 1; i < 6; i++) {
                    assert.equal(
                        await fundMe.addressToAmountFunded(accounts[i].address),
                        0,  
                    )
                }
        })

        // Here we want to test that it only allows the owner of the account to withdraw i.e ---> modifier onlyOwner { if (msg.sender != i_owner) revert FundMe__NotOwner(); _;}
        it("Only allows the owner to withdraw", async function () {
            const accounts  = await ethers.getSigners()
            const attacker = accounts[1]
            const attackerConnectedContract = await fundMe.connect(attacker)
            await expect(attackerConnectedContract.withdraw()).to.be.revertedWith("FundMe__NotOwner") // error FundMe__NotOwner();
        })
    })
})

*/


/*
// 11:52:37 ---> Gas optimizations using storage knowledge
// we added cheaperWithdraw() to cost less gas

// but i didnt test it bcos i know it will work
// also i have to change all this words like priceFeed to priceFeed, funders to funders and addressToAmountFunded to addressToAmountFunded
// sp i dontfee like doing it 

const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    const sendValue = ethers.utils.parseEther("1")

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)

        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer,
        )
    })

    describe("constructor", async function () {
        it("sets the aggregator addressed correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })

    describe("fund", async function () {
        it("Fails if you dont send enough ETH", async function () {
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!",
            )
        })

        it("update the amount funded data structure", async function () {
            await fundMe.fund({ value: sendValue })
            const response = await fundMe.addressToAmountFunded(deployer)
            assert.equal(response.toString(), sendValue.toString())
        })

        it("Adds funder to array of funders", async function () {
            await fundMe.fund({ value: sendValue })
            const funder = await fundMe.funders(0)
            assert.equal(funder, deployer)
        })
    })

    describe("withdraw", async function () {
        beforeEach(async function () {
            await fundMe.fund({ value: sendValue })
        })

        it("withdraw ETH from a single founder", async function () {
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address,
            )
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer,
            )

            const transactionResponse = await fundMe.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)

            const { gasUsed, effectiveGasPrice } = transactionReceipt

            const gasCost = gasUsed.mul(effectiveGasPrice)

            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address,
            )

            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer,
            )

            assert.equal(endingFundMeBalance, 0)

            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString(),
            )
        })

        it("Allows us to withdraw with multiple funders", async function () {

            // Arrange
            const accounts = await ethers.getSigners() 
            
            for (let i = 1; i < 6; i++) { 
                
                const fundMeConnectedContract = await fundMe.connect(
                    accounts[i],
                )
                await fundMeConnectedContract.fund({ value: sendValue })
            }
                const startingFundMeBalance = await fundMe.provider.getBalance(
                    fundMe.address,
                )
                const startingDeployerBalance =
                    await fundMe.provider.getBalance(deployer)

                // Act
                const transactionResponse = await fundMe.withdraw()
                const transactionReceipt = await transactionResponse.wait(1)

                const { gasUsed, effectiveGasPrice } = transactionReceipt

                const gasCost = gasUsed.mul(effectiveGasPrice)

                // Assert
                const endingFundMeBalance = await fundMe.provider.getBalance(
                    fundMe.address,
                )

                const endingDeployerBalance = await fundMe.provider.getBalance(
                    deployer,
                )

                assert.equal(endingFundMeBalance, 0) 

                assert.equal(
                    startingFundMeBalance
                        .add(startingDeployerBalance)
                        .toString(),
                    endingDeployerBalance.add(gasCost).toString(),
                )

                
                await expect(fundMe.funders(0)).to.be.reverted 

                for (i = 1; i < 6; i++) {
                    assert.equal(
                        await fundMe.addressToAmountFunded(accounts[i].address),
                        0,  
                    )
                }
        })

        it("Only allows the owner to withdraw", async function () {
            const accounts  = await ethers.getSigners()
            const attacker = accounts[1]
            const attackerConnectedContract = await fundMe.connect(attacker)
            await expect(attackerConnectedContract.withdraw()).to.be.revertedWith("FundMe__NotOwner") // error FundMe__NotOwner();
        })

        // we added cheaperWithdraw() to cost less gas
        it("Cheaper withdraw testing...", async function () {

            // Arrange
            const accounts = await ethers.getSigners() 
            
            for (let i = 1; i < 6; i++) { 
                
                const fundMeConnectedContract = await fundMe.connect(
                    accounts[i],
                )
                await fundMeConnectedContract.fund({ value: sendValue })
            }

                const startingFundMeBalance = await fundMe.provider.getBalance(
                    fundMe.address,
                )
                const startingDeployerBalance =
                    await fundMe.provider.getBalance(deployer)

                // Act
                // we added cheaperWithdraw() to cost less gas
                const transactionResponse = await fundMe.cheaperWithdraw()
                const transactionReceipt = await transactionResponse.wait(1)

                const { gasUsed, effectiveGasPrice } = transactionReceipt

                const gasCost = gasUsed.mul(effectiveGasPrice)

                // Assert
                const endingFundMeBalance = await fundMe.provider.getBalance(
                    fundMe.address,
                )

                const endingDeployerBalance = await fundMe.provider.getBalance(
                    deployer,
                )

                assert.equal(endingFundMeBalance, 0) 

                assert.equal(
                    startingFundMeBalance
                        .add(startingDeployerBalance)
                        .toString(),
                    endingDeployerBalance.add(gasCost).toString(),
                )

                
                await expect(fundMe.funders(0)).to.be.reverted 

                for (i = 1; i < 6; i++) {
                    assert.equal(
                        await fundMe.addressToAmountFunded(accounts[i].address),
                        0,  
                    )
                }
        })
    })
})

*/


// 12:11:42 ---> Staging test

const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", function () {
          let fundMe
          let mockV3Aggregator
          let deployer
          const sendValue = ethers.utils.parseEther("1")
          beforeEach(async () => {
              // const accounts = await ethers.getSigners()
              // deployer = accounts[0]
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              fundMe = await ethers.getContract("FundMe", deployer)
              mockV3Aggregator = await ethers.getContract(
                  "MockV3Aggregator",
                  deployer
              )
          })

          describe("constructor", function () {
              it("sets the aggregator addresses correctly", async () => {
                  const response = await fundMe.getPriceFeed()
                  assert.equal(response, mockV3Aggregator.address)
              })
          })

          describe("fund", function () {
              // https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
              // could also do assert.fail
              it("Fails if you don't send enough ETH", async () => {
                  await expect(fundMe.fund()).to.be.revertedWith(
                      "You need to spend more ETH!"
                  )
              })
              // we could be even more precise here by making sure exactly $50 works
              // but this is good enough for now
              it("Updates the amount funded data structure", async () => {
                  await fundMe.fund({ value: sendValue })
                  const response = await fundMe.getAddressToAmountFunded(
                      deployer
                  )
                  assert.equal(response.toString(), sendValue.toString())
              })
              it("Adds funder to array of funders", async () => {
                  await fundMe.fund({ value: sendValue })
                  const response = await fundMe.getFunder(0)
                  assert.equal(response, deployer)
              })
          })
          describe("withdraw", function () {
              beforeEach(async () => {
                  await fundMe.fund({ value: sendValue })
              })
              it("withdraws ETH from a single funder", async () => {
                  // Arrange
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  // Act
                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait()
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const gasCost = gasUsed.mul(effectiveGasPrice)

                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  // Assert
                  // Maybe clean up to understand the testing
                  assert.equal(endingFundMeBalance, 0)
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(gasCost).toString()
                  )
              })
              // this test is overloaded. Ideally we'd split it into multiple tests
              // but for simplicity we left it as one
              it("is allows us to withdraw with multiple funders", async () => {
                  // Arrange
                  const accounts = await ethers.getSigners()
                  for (i = 1; i < 6; i++) {
                      const fundMeConnectedContract = await fundMe.connect(
                          accounts[i]
                      )
                      await fundMeConnectedContract.fund({ value: sendValue })
                  }
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  // Act
                  const transactionResponse = await fundMe.cheaperWithdraw()
                  // Let's comapre gas costs :)
                  // const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait()
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const withdrawGasCost = gasUsed.mul(effectiveGasPrice)
                  console.log(`GasCost: ${withdrawGasCost}`)
                  console.log(`GasUsed: ${gasUsed}`)
                  console.log(`GasPrice: ${effectiveGasPrice}`)
                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  // Assert
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(withdrawGasCost).toString()
                  )
                  // Make a getter for storage variables
                  await expect(fundMe.getFunder(0)).to.be.reverted

                  for (i = 1; i < 6; i++) {
                      assert.equal(
                          await fundMe.getAddressToAmountFunded(
                              accounts[i].address
                          ),
                          0
                      )
                  }
              })
              it("Only allows the owner to withdraw", async function () {
                  const accounts = await ethers.getSigners()
                  const fundMeConnectedContract = await fundMe.connect(
                      accounts[1]
                  )
                  await expect(
                      fundMeConnectedContract.withdraw()
                  ).to.be.revertedWith("FundMe__NotOwner")
              })
          })
      })