// const {assert, expect} = require('chai');

// // check for chai
// require('chai')
// .use(require('chai-as-promised'))
// .should()

// const Web3 = require('web3');
// const Lottery = require('../src/abis/Lottery.json');
// const ganache = require('ganache-cli');

// // const {contracts} = require('../src/components/lottery');

// const web3 = new Web3(ganache.provider());
// const networkId = 5777;

// let abi = Lottery.abi;
// let address = Lottery.networks[5777].address;
// let lottery;
// let accounts;

// beforeEach(async () => {
//     accounts = await web3.eth.getAccounts();
//     lottery = await web3.eth.Contract(abi, address);    
// })

// describe('Lottery Contract', async () => {

//     let result;
//     beforeEach("send transaction", async (done) => {
//         // lottery.methods.enter().send({
//         //     from: accounts[0],
//         //     value: web3.utils.toWei('1', 'ether')
//         // }).then((res) => {
//         //     result = res;
//         //     done();
//         // })
//     })
//     it('allows one account to enter', (done)=>{

//         lottery.methods.enter().send({
//             from: accounts[0],
//             value: web3.utils.toWei('1', 'ether')
//         }).then((res) => {
//             result = res;
//             done();
//         }).done(null, done);

//         // setTimeout(async ()=> {
//         //     await lottery.methods.enter().send({
//         //         from: accounts[0],
//         //         value: web3.utils.toWei('1', 'ether')
//         //     })
//         //     done();
//         // }, 50);        
//         // lottery.methods.enter().send({   
//         //     from: accounts[0],
//         //     value: web3.utils.toWei('1', 'ether')
//         // }).then((res) => {
//         //     expect(res).equal('0x00');
//         //     done();
//         // }).catch(done);

//         // const result = await lottery.methods.enter().send({
//         //     from:accounts[0],
//         //     value: web3.utils.toWei('1', 'ether')
//         // })

//         expect(result).to.equal('')
        
//         // return new Promise(async () => {
//         //     await lottery.methods.enter().send({
//         //         from:accounts[0],
//         //         value: web3.utils.toWei('1', 'ether')
//         //     })
//         // })
//         // assert.notEqual(accounts[0], '');

//         // assert.notEqual(result, 0x0);
//         // assert.notEqual(result, '');
//         // assert.notEqual(result, undefined);
//     })

//     it('get players count', async () => {
//         // lottery.methods.getPlayers().call({
//         //     from:accounts[0]
//         // }).then((res) => {
//         //     expect(res[0]).equal(accounts[0]);
//         //     done();
//         // }).catch(done);
//         // assert.equal(players[0], accounts[0]);
//     })

// })

const Lottery = artifacts.require("./Lottery");
const {assert} = require('chai');

contract("contract test", (accounts) => {

    let lottery;
    before("contract ", async() => {
        lottery = await Lottery.deployed();
    })

    
    describe("manager", async() => {
        
        it("enter the lottery", async ()=>{            
            const result = await lottery.enter({from:accounts[0], value:1000000000000000000});
            assert.notEqual(result, "0x00");
        })
        it("enter the lottery", async ()=>{            
            const result = await lottery.enter({from:accounts[1], value:2000000000000000000});
            assert.notEqual(result, "0x00");
        })
        it("enter the lottery", async ()=>{            
            const result = await lottery.enter({from:accounts[2], value:3000000000000000000});
            assert.notEqual(result, "0x00");
        })

        it("get players", async() => {
            const players = await lottery.getPlayers();

            assert.equal(players[0], accounts[0]);
            assert.equal(players.length, 3);
        })

        
    })
})
