
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



}


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;

    }

    createGenesisBlock(){
        return new Block("0", "06/02/2021", "Genesis Block");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }


    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
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
