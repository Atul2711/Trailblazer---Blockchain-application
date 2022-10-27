import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';
const address = '0x2D490537B636b88C7FBbe9A03abD70c654D97450';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    address
);

export default instance;