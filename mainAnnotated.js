
const SHA256 = require("crypto-js/sha256");

// hw-
// 1
// think about what are some of the issues with Blockchain, what
// is POW for, etc. Significant problems with this blockchain that
// would make it not good as a currency. Can it be spammed, tampered with, etc.
// What kind of countermeasures might be helpful

// 2
// start an Anki deck


class Block {
    constructor(transactions, timeStamp, previousHash=''){
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.timeStamp = timeStamp;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }


    calculateHash() {
        return SHA256(this.previousHash + this.timeStamp + this.transactions + this.nonce).toString();
    }


    mineBlock(difficulty){
        while(this.hashDifficultyDoesNotMatch(difficulty)){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }


    hashDifficultyDoesNotMatch(difficulty){
        return this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0");
    } 
// difficulty = 2
//  hash:   0 0 9 0 9 asdfadsf0909
// "000909asdjfkljds".substring(0,2) -> 00
//indexes:  0 1 2
}




class Transaction {
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}




class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }


// when we create a blockchain, an instance of the blockchain class, it automatically
// creats its Genesis block within the constructor. So if i successfully create a blockchain and call
// 'Blockchain1.chain' for example, it should return that block.
// Actually no, it should return an array. That's the blockchain. It does include the genesis block,
// so it should only have that one at the beginning. But you add more gradually. That's why you
// call array.length - 1 later.
    createGenesisBlock(){
        return new Block("0", "06/02/2021", "Genesis Block");
    }

// To get the latest block on the chain, you grab the last object in the array. Still not sure
// what kind of object a block is exactly. What would I see in the array if it was in the console?

    getLatestBlock(){
      // this.chain is this instance, this blockchain. The 'chain' property is the array
      // or record of its blocks. I guess its weird in this case bc it seems like the Blockchain
      // would not only contain blocks but be a list of blocks itself.
        return this.chain[this.chain.length - 1];
    }


    // So if I want to add a new block, this method is on the blockchain class.
    // You pass it a newBlock? It shows below that you actually pass this method not a name
    // or an object, but the command 'new Block(etc, etc, etc)' like you were creating a new block
    // separately. Which makes sense, if they ony exist on the blockchain. Like you create and add
    // a block to the blockchain, since verifiable chain is the point.
    
    
    // TODO: before 8/4 
    // addBlock(newBlock){
    //     newBlock.previousHash = this.getLatestBlock().hash; // linking the new block
    //     newBlock.mineBlock(this.difficulty); // mining the new block
    //     this.chain.push(newBlock); // adding it to the blockchain
    // }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction)
    }

    minePendingTransactions(miningRewardAddress){
        // creating the new block with the current pending transactions
        let newBlock = new Block(this.pendingTransactions, Date.now()); 
        // linking the block, mining it, then adding it to the blockchain
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        // resetting pending transactions, sending mining reward
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress == address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress == address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

// HW
// watch those two anders videos
// test if everything's working, since we don't have an addBLock method and 
// added a couple new ones 
// consider the limitations of this version so far
// eloquent javascript, might be an online version
// add the cards to the anki deck. they can be for this program 
// specifically bc it does show examples (instead of like defintions)
// anders demo is good
// exp at 9:21
// [1, 3, 5]
    isValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            // this first line is making sure that the block wasn't tampered with.
            // Since if the data or anything was changed, the hash would be different.
            if (currentBlock.hash !== currentBlock.calculateHash())
                return false;
            if (currentBlock.previousHash !== previousBlock.hash)
                return false;
        }
        return true;
    }

}


let jadCoin = new Blockchain();

console.log("creating transactions");
jadCoin.createTransaction(new Transaction("1Address", "2Address", 100));
jadCoin.createTransaction(new Transaction("2Address", "1Address", 20));

console.log("starting the miner:");
jadCoin.minePendingTransactions("miner address 1");
jadCoin.minePendingTransactions("miner address 1");
console.log(jadCoin.getBalanceOfAddress("miner address 1"));



