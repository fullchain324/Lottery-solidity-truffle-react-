import web3 from './web3';
import Lottery from '../abis/Lottery.json';



const address = '0xE3fF927CB37434C7ddd86e9dD85af58dCFFE3b3D';
const abi = Lottery.abi;

export default new web3.eth.Contract(abi, address);
