pragma solidity ^0.4.17;

//maintain security and easily keep track of all deployed contracts
contract CampaignFactory {

    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newDeployedAddress = new Campaign(minimum,msg.sender);
        deployedCampaigns.push(newDeployedAddress);
    }

    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }

}

//variables ;- manager address , minimumLimit ,approvers address array and request structs(vendor address)

//Functions/methods :- Campaign(constructor to set manager and minimumlimit), createRequest (for creating request for money),approvalRequest (called by contributors to approve)
// finalizeRequest (called by manager to send aprroved money to vendor)

contract Campaign{

    struct Request{
        string  description;
        uint  value ;
        address  recipient;
        bool complete;
        uint approvalCount;
        mapping (address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;

    //address[] public approvers;
    //use mapping to cutdown search time to O(1) from O(n)
    //if not found in map it will return default value of that datatype instead of returning undefined like JS
    //Also key is not stored inside the mapping and we cannot iterate thorugh mapping
    mapping( address => bool ) public approvers;
    uint public approversCount;
    
    Request[] public requests;

    modifier restricted(){
        /***********Require*****************/
        //require is like if statement with a break functionality
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum , address creator) public{

        manager = creator;
        minimumContribution = minimum;

    }

    function contribute() public payable {
        
        require(msg.value > minimumContribution);

        //approvers.push(msg.sender);
        approvers[msg.sender]= true;
        approversCount++;

    }

    function createRequest( string description,uint value,address recipient) public restricted {
        
        Request memory newRequest = Request({
            //We only need to initialize value type not the reference type(mapping)
            description : description,
            value : value,
            recipient : recipient,
            complete : false,
            approvalCount:0
            
        });

        requests.push(newRequest);

    }

//One vote per approvers and it should able to handle thousands of contributors

    function approveRequest(uint index) public{

        Request storage request = requests[index];
        
        //Check 1 : User must be approvers
        require(approvers[msg.sender]);

        //Check 2 : Request is not approved yet by the user (to stop multiple votes)
        require(request.approvals[msg.sender] == false);

        request.approvals[msg.sender] =true;
        request.approvalCount = request.approvalCount + 1;

    }

    function finalizeRequest(uint index) public restricted {

        Request storage request = requests[index];

        require(request.complete == false);

        //Atleast 50% approvals
        uint count = request.approvalCount;
        require ( count > (approversCount/2));

        //Sending the amount using transfer()
        uint amount=request.value;
        request.recipient.transfer(amount);

        request.complete=true;

    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {

        return(
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager

        );
    }

    function getRequestsCount() public view returns(uint){

        return (
            requests.length
        );
    }

}

//In refeence with Where our contracts stores data
//Storage --> Permananent memory like HDD(varaibles are stored)                    
//Memory  --> temporary memory like RAM

//In reference of how our solidity variables store values

//Storage --> 
/*
int[] storage temp=Array;
--->this temp will directly point to address where Array is stored and
we can R/W the values using temp as well if storage keyword is used 
just like reference */

//Memory  -->
/*
int [] memory temp=array;
---> in this a new copy of array is created and temp points to the copy
array just like call by value 
*/

/*
Adding a new Contract "Factory" which will be used to deploy the
"campaign" contract and store the addresses of the deployed contracts 

VAriable  : DeployedCampaigns -> store the address of deployed contracts
Functions : 1) createCampaign -> deploys a new instance of the Campaign and stores the deployed address
            2) getDeployedCampaigns -> returns a list of all deployed contracts 
*/

