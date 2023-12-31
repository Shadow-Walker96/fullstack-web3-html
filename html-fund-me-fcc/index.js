// Lesson 8: 13:35:50 ------- withdraw function

import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")

const fundButton = document.getElementById("fundButton")

const balanceButton = document.getElementById("balanceButton")

const withdrawButton = document.getElementById("withdrawButton")

connectButton.onclick = connect
fundButton.onclick = fund

balanceButton.onclick = getBalance

withdrawButton.onclick = withdraw

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
        console.log(ethers.utils.formatEther(balance))
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value // <input id="ethAmount" placeholder="0.1" />

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

async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        console.log("withdrawing...")
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const signer = provider.getSigner()

        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const transactionResponse = await contract.withdraw()
            await listenForTransactionMine(transactionResponse, provider)
        } catch (error) {
            console.log(error)
        }
    }
}
