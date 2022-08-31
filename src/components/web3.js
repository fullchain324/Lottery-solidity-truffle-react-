import Web3 from 'web3';

(async function() {
    await window.ethereum.enable();
})();

const web3 = new Web3(window.web3.currentProvider);

export default web3;
