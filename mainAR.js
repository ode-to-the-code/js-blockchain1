


what arguments does the Block class constructor take? 
data, timestamp, previousHash

how and when is a block's hash created? 
in the constructor by using calculate hash. Like 'this.hash = calculateHash()'. You don't have to 
pass it anything, SHA takes care of it in the function.

what does SHA256 take?


how is the 