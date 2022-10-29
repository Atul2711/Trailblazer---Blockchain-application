# Trailblazer
#### Trailblazer is a decentralized crowd funding application where a user can start fundraising for  his/her creative projects, where anyone can contribute to bring the project to life and the user can only wihtdraw money with the approval of the contributors who have contributed to the campaign and after successfull approval user can send that money to the shopkeepers or the materials provider of the project.Trailblazer platform is built for ambitious,innovative and imaginative projects which can be brought to life through the support of the other peoples.

## Flow of Application :
* User can create a Campaign and user will be marked as owner.
* Other users can contribute to the Campaign.
* If required than owner can create a request to withdraw the amount.
* Only contributors can vote the request.
* If the approval count is more than 50% of the contributors than the owner can withdraw the amount.

## Tech stack used:
* Next.js : For building the frontend.
* Solidity : For writing smart contracts.
* web3.js : Web3 client.
* Mocha : For testing.
* Ethereum : For secure execution and verification of application code.

## How to run:
* Install all modules
```
npm install
```
* Compile contract
```
node compile.js
```
* Run some tests
```
npm run test
```
* Deploy contract
```
 node deploy.js
 ```
* Run Next.js frontend
```
npm run dev
```

