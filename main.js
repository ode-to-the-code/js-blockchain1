
const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(data, timeStamp, previousHash=''){
        this.data = data;
        this.previousHash = previousHash;
        this.timeStamp = timeStamp;
        this.hash = this.calculateHash();
        
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timeStamp + this.data).toString();
    }

    // what are two reasons you need some kind of algo like pow?
    // -they could make lots of blocks quickly 
    // preventing tampering of the past 

    // 51% attack
    // if someone controls more than half of the network, even with POW, they can rewrite history.
    // PROOF OF WORK - MINING ALGORITHM
    mineBlock(difficulty) {
        // substring and string review
        // "the cat and the dog".substring(0,2) -> th
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0"))
            this.nonce++; // 0,1,2,3,4,5,
            this.hash = this.calculateHash();
        console.log("BLOCK SUCCESSFULLY MINED: " + this.hash);
    }

    // minePendingTransactions(miningRewardAddress) {
    //     // create a new block with pending transactions and mine it...
    // }
}

// class Transaction {
//     constructor(fromAddress, toAddress, amount){
//         this.fromAddress = fromAddress;
//         this.toAddress = toAddress;
//         this.amount = amount;
        
//     }
// }

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;

        // // place to store transactions in between creating a block
        // this.pendingTransactions = [];
        // // how many coins a miner will receive for their efforts
        // this.miningReward = 100;

    }

    createGenesisBlock(){
        return new Block("0", "06/02/2021", "Genesis Block");
    }

    getLatestBlock(){
        // array review
        return this.chain[this.chain.length - 1];
    }
   
    // addBlock(newBlock){
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }
    // replaces addBlock method 
    createTransaction(transaction) {
        // some validation of the transactions here...

        // push transaction to pending

    }
    // return true or false
    isValid(){
        for (let i = 1; i < this.chain.length; i++) { 
            const currentBlock = this.chain[i]; // indexing an array (1)
            const previousBlock = this.chain[i-1];
            
            if (currentBlock.hash !== currentBlock.calculateHash())
                return false;
            if (currentBlock.previousHash !== previousBlock.hash)
                return false;
        }
        return true;
    }

}

let jadCoin = new Blockchain();
jadCoin.addBlock(new Block("1", "06-02-2021"))


// think about how we could validate the Blockchain, implementing basic mining. like if the chain
// is true return true, false false. Is each block valid and point to the preivous block? 