const HDWalletProvider=require('@truffle/hdwallet-provider'); //Connect with Account and will specify network
const Web3=require('web3');
require('dotenv').config();

//only deploying campaign factory

const compiledFactory = require('./build/CampaignFactory.json');


const provider=new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.API

);
 
const web3=new Web3(provider);

const deploy = async ()=>{
    const accounts=await web3.eth.getAccounts();
    console.log('Attempting ro deploy from account ',accounts[0]);

    const result=await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data:compiledFactory.bytecode })
    .send({ from: accounts[0] , gas:'1000000'})

    console.log(compiledFactory.interface);
    console.log('Contract deployed at address',result.options.address);
    provider.engine.stop();
};

deploy();
