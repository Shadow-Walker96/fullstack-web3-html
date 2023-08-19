/*
// Lesson 8: 12:57:07 --------- Javascript in its own files

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("connectButton").innerHTML = "Connected!";
    console.log("Connected!");
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please install metamask!";
  }
}
*/

/*
// Lesson 8: 12:59:12 --------- ES6 (Frontend Js) Vs NodeJS
// We want to build our fund function and little modification in our code 

import { ethers } from "./ethers-5.6.esm.min.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")

connectButton.onclick = connect
fundButton.onclick = fund

console.log(ethers)

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        connectButton.innerHTML = "Connected!"
        console.log("Connected!")
    } else {
        connectButton.innerHTML = "Please install metamask!"
    }
}

//Fund function
async function fund() {
    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        // provider / connection to the blockchain
        // signer / wallet / someone with gas
        // contract that we are interacting with
        // ^ ABI & Address
    }
}

*/


/*
// Lesson 8: 13:07:57 --------- Sending a Transaction from a website
// We expanded our fund()
// we created a constants.js file, which we will keep our ABI and Address of the contract

import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")

connectButton.onclick = connect
fundButton.onclick = fund

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        connectButton.innerHTML = "Connected!"
        console.log("Connected!")
    } else {
        connectButton.innerHTML = "Please install metamask!"
    }
}

async function fund() {
    const ethAmount = "77"
    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {

        // Web3Provider is similar to JsonRpcProvider
        // window.ethereum is the endpoint
        // Here our provider is our metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // in metamask if it is account 1 we connected to it will return it
        const signer = provider.getSigner()
        console.log(signer)

        const contract = new ethers.Contract(contractAddress, abi, signer)

        const transactionResponse = await contract.fund({
            value: ethers.utils.parseEther(ethAmount),
        })
    }

    // Now when we click on the fund button, an error will occur which will say this below : 

    // MetaMask - RPC Error: err: insufficient funds for gas * price + value: address 0x404d12d289657809A152F0695c4B347690B3a442 
    // have 496973384873142098 want 77000000000000000000 (supplied gas 15010499)
    
    // also it will show this 
    // Uncaught (in promise) Error: insufficient funds for intrinsic transaction cost 

    // The reason for this error is that currently the blockchain network we are connected to is
    // metamask and our contract is deployed the local blockchain in our computer when is hardhat 
    // so we have to add our hardhat local network to metamask
}

*/

/*
// Lesson 8: 13:07:57 --------- Sending a Transaction from a website, i just splitted it, but no extra code written here
// Still the same code from the previous part
// i have added the hardhat localhost note to metamask

import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")

connectButton.onclick = connect
fundButton.onclick = fund

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        connectButton.innerHTML = "Connected!"
        console.log("Connected!")
    } else {
        connectButton.innerHTML = "Please install metamask!"
    }
}

async function fund() {
    const ethAmount = "0.1"

    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const signer = provider.getSigner()
        console.log(signer)

        const contract = new ethers.Contract(contractAddress, abi, signer)

        // We added try and catch so that if there is an error, it will log it properly
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Now when we click on the fund button, it works but it will say that we dont have insuffiient fund in
    // our account 1 which is true

    // so what we can do is that we can copy one of the private key in in hardhat and in metamask
    // we can import the private key

    // Everything works fine !!!
}

*/


/*
// Lesson 8: 13:20:05 ------- Listening for events and completed transaction
// We would listen for the transaction to be mined

import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")

connectButton.onclick = connect
fundButton.onclick = fund

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        connectButton.innerHTML = "Connected!"
        console.log("Connected!")
    } else {
        connectButton.innerHTML = "Please install metamask!"
    }
}

async function fund() {
    const ethAmount = "10"

    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const signer = provider.getSigner()
        console.log(signer)

        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })

            // wait for transaction to be finish

            await listenForTransactionMine(transactionResponse, provider)
            console.log("Done!")
            
        } catch (error) {
            console.log(error)
        }
    }
}

// We want to create a function for listening for transaction mined
// We intentionally dont want it to be a async function because

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`)
    // Listen for this transaction to finish i.e we are talking about the transactionReceipt
    return new Promise((resolve, reject) => {
        // we listen to event in ethers by using `provider.once()`

        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `Completed with ${transactionReceipt.confirmations} confirmations`,
            )
            resolve()
        })
    })
}

*/

/*
// Lesson 8: 13:30:42 ------- Input Forms
// We want to give the user an input field to put an amount of ETH

import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")

connectButton.onclick = connect
fundButton.onclick = fund

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        connectButton.innerHTML = "Connected!"
        console.log("Connected!")
    } else {
        connectButton.innerHTML = "Please install metamask!"
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value  // <input id="ethAmount" placeholder="0.1" />

    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const signer = provider.getSigner()
        console.log(signer)

        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })

            await listenForTransactionMine(transactionResponse, provider)
            console.log("Done!")
        } catch (error) {
            console.log(error)
        }
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`)
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `Completed with ${transactionReceipt.confirmations} confirmations`,
            )
            resolve()
        })
    })
}

*/


/*
// Lesson 8: 13:33:33 ------- Reading from the Blockchain 
// we want to add a button called getBalance for the user to know the balance or 
// how much money he has 

import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")

const balanceButton = document.getElementById("balanceButton")

connectButton.onclick = connect
fundButton.onclick = fund

balanceButton.onclick = getBalance

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        connectButton.innerHTML = "Connected!"
        console.log("Connected!")
    } else {
        connectButton.innerHTML = "Please install metamask!"
    }
}

// We want to create a getBalance function
async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const balance = await provider.getBalance(contractAddress)
    //formatEthers() makes it easy to read the values
    console.log(ethers.utils.formatEther(balance));
  }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value  // <input id="ethAmount" placeholder="0.1" />

    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const signer = provider.getSigner()

        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })

            await listenForTransactionMine(transactionResponse, provider)
            console.log("Done!")
        } catch (error) {
            console.log(error)
        }
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`)
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `Completed with ${transactionReceipt.confirmations} confirmations`,
            )
            resolve()
        })
    })
}

*/



