import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';
const address = '0x447304297ec58Acdf797C2B34Ca5834827FFfBB7';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    address
);

export default instance;