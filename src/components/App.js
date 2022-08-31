import * as React from "react";
// import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import Lottery from '../abis/Lottery.json'
// import {MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn} from 'mdb-react-ui-kit';
import './App.css';
import lottery from './lottery';
import web3 from "./web3";

function App() {

    // async function loadWeb3() {
    //     const provider = await detectEthereumProvider();
        
    //     if (provider) {
    //         console.log("Ethereum wallet is connected");
    //         window.web3 = new Web3(provider);
    //     } else {
    //         console.log("Ethereum wallte is not connected");
    //     }
    // } 

    // async function loadBlockchainData() {
    //     const web3 = window.web3;

    //     //const accounts = await web3.eth.getAccounts();

    //     // const acounts = await window.ethereum.send('eth_requestAccounts');
    //     await window.ethereum.enable();
    //     const accounts = await web3.eth.getAccounts();

    //     const networkId = await web3.eth.net.getId();
    //     const networkData = Lottery.networks[networkId];
    //     console.log(accounts[0]);

    //     if(networkData) {
    //         const abi = Lottery.abi;
    //         const address = networkData.address; 
    //         const contract = new web3.eth.Contract(abi, address);
            
    //         const result = await contract.methods.enter().send({
    //             from: accounts[0],
    //             value: web3.utils.toWei('1', 'ether')
    //         })

    //         console.log("result", result);

    //         const result1 = await contract.methods.getPlayers().call({from:accounts[0]})
    //         console.log("result1", result1);
    //     } else {
    //         window.alert('Smart contract not deployed')
    //     }
    // }

    const [state, setState] = React.useState({
        manager:'mub',
        players: [],
        balance: '',
        value: '',
        message:'',
    });

    React.useEffect(async ()=> {
        // await loadWeb3();
        // await loadBlockchainData();

        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);
        setState({...state, manager:manager, players: players, balance: balance});

    },[]);

    const handleChange = (event) => {
        setState({...state, value: event.target.value});
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        setState({...state, message:'Waiting on transaction success...'});
        
        await lottery.methods.enter().send({
            from: accounts[0],
            value:web3.utils.toWei(state.value, 'ether'),
        })

        setState({...state, message:'You have been entered!'});
    }

    const handlePickWinner = async() => {
        const accounts = await web3.eth.getAccounts();

        setState({...state, message:'Waiting on transaction success...'})
        await lottery.methods.pickWinner().send({
            from:accounts[0]
        });
        setState({...state, message:'A winner has been picked'});

    }
    return (
        <div className="lottery">
            <header className="lottery-header">
                <h1 className="lottery-title">
                    Welcome Lottery!
                </h1>
            </header>
            <main className = "main">
                <p>
                    This contract is managed by {state.manager} <br />
                    There are currently {state.players.length} people entered, <br />
                    competing to win {web3.utils.fromWei(state.balance)} ether! <br />
                </p>
                <hr/>
                <form onSubmit = {onSubmit}>
                    <h4>Want to try your luck!</h4>
                    <div>
                        <label>Amount of ether to enter </label>
                        <input value = {state.value} onChange = {handleChange}>
                        </input>
                    </div>
                    <button>
                        Enter
                    </button>
                </form>

                <hr />
                
                <h4>
                    Ready to pick a winner?
                    <button onClick = {handlePickWinner}>Pick a winner!</button>
                </h4>
                <hr />

                <h2>{state.message}</h2>
            </main>

        </div>
    )
}
export default App;