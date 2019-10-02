import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0x856EEAA013BF6763ba7a3F8A2321AeDd42584e17'
	);

export default instance;