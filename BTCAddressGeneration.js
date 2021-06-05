const express =  require('express')
const bodyparser = require('body-parser')
const bitcore = require('bitcore-lib')
var app =  express();


app.use(bodyparser.urlencoded({
    extended:true
}))
 
app.use(bodyparser.json())

function btcWallet(uinput, callback){
    var input = new Buffer(uinput);
   var hash =bitcore.crypto.Hash.sha256(input);
   var bn =  bitcore.crypto.BN.fromBuffer(hash);
   var pk = new bitcore.PrivateKey(bn).toWIF()
   var addy = new bitcore.PrivateKey(bn).toAddress()
   callback(pk ,addy)

}



app.post('/wallet',(req , res)=>{
   var brainsrc = req.body.brainsrc;
   btcWallet(brainsrc,(priv ,addr)=>{
    res.json( 
        // " blockchain address   " + addr + 
        // " privatekey   " +  priv
        {
           address: `${addr}`,
            privateKey : priv
        }
        )
        console.log(priv,addr)
   })


})

app.listen(3000,()=>{
    console.log('running on 3000')
})
