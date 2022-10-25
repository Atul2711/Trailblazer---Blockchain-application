// compile only once and save it to build diectory to avoid recompiling
// When ever changes is made in contract it will delete the build directory and 
// again store a new compiled data to the directory

const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');

//delete the entire data
fs.removeSync(buildPath);  //provided by fs-extra

const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol')
const source = fs.readFileSync(campaignPath,'utf8');
const output = solc.compile(source,1).contracts; //object

//Create build folder
fs.ensureDirSync(buildPath);  //checks if dir exists if not then creates one

for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath,contract.replace(':','') + '.json'),
        output[contract]
    );
}
