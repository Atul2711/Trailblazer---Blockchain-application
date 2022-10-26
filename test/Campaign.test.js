const assert = require('assert');
const ganache = require ('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../trailblazers/build/CampaignFactory.json');
const compiledCampaign = require('../trailblazers/build/Campaign.json');


let accounts;
let factory;

//for testing the campaign contract 
let campaign;
let campaignAddress;

beforeEach(async()=>{

    accounts = await web3.eth.getAccounts(); //by default we get 10 accounts by ganache

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data :compiledFactory.bytecode })
    .send({ from :accounts[0] , gas:'1000000'});

    await factory.methods.createCampaign('100').send({
        from:accounts[0],
        gas:'1000000'
    });

    // const addresses = await factory.methods.getDeployedCampaigns().call();
    // campainAddress = addresses[0] ;

    [ campaignAddress ] = await factory.methods.getDeployedCampaigns().call();

    //Already deployed same as remix address input button
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
    
});


describe('Campaigns',()=>{

    it ('deploys a factory and campaign',()=>{

        assert.ok(factory.options.address);
        assert.ok(campaignAddress);
        // console.log(campaignAddress);
        // console.log(campaign.options.address);
    
    });

    
    it ('marks caller as the campaign manager', async ()=>{

        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0],manager); //(what we hope,what it is)

    });

    
    it ('allows people to contribute money and marks them as approver',async ()=>{
        
        await campaign.methods.contribute().send({
            value:'200',
            from: accounts[1]
        });

        const isContributor =await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);

    });

    it('requires a minimum contribution', async ()=>{

        try {
            await campaign.methods.contribute().send({
                value : '5',
                from: accounts[1]
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('allows a manager to make payment request(finalizeRequets)',async()=>{

        await campaign.methods.createRequest(
            'Just need amount for testing' , '100' , accounts[5]
        ).send({
            from:accounts[0],
            gas:'1000000'
        }); //returns nothing so we need to access requests

        //using send bcoz it is trying to modify contract data

       const newRequest = await campaign.methods.requests(0).call();
       assert.equal('Just need amount for testing',newRequest.description);

    });

    it('end to end test ' ,async ()=>{

        //Contribute 
        await campaign.methods.contribute().send({
            value:web3.utils.toWei('10','ether'),
            from: accounts[0]
        });

        //Create request
        await campaign.methods.createRequest(
            'Just need amount for testing' , web3.utils.toWei('5','ether') , accounts[5]
        ).send({
            from:accounts[0],
            gas:'1000000'
        });

        //Voting
        await campaign.methods.approveRequest(0).send({
            from:accounts[0],
            gas:'1000000'
        });

        //finalizeRequest
        await campaign.methods.finalizeRequest(0).send({
            from:accounts[0],
            gas:'1000000'
        });

        //retriveing the balance at accounts[5]
        let transferedMoney = await web3.eth.getBalance(accounts[5]);  //returns string
        transferedMoney = web3.utils.fromWei(transferedMoney,'ether'); //string in ehter
        transferedMoney = parseFloat(transferedMoney);
        console.log(transferedMoney);
        assert(transferedMoney > 103); //initially 100 ether

    });

});