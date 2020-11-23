import React, { Component } from 'react'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Navbar from './Navbar'
import './App.css'

class App extends Component {

  // lifecycle function within react
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }


  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // connect ganache network to dapp
    const networkId = await web3.eth.net.getId()
    // console.log(networkId);

    // Load DaiToken from abis/DaiToken.json
    const daiTokenData = DaiToken.networks[networkId]
    // If address exists create a web3 version of this if not alert to window
    if (daiTokenData) {
      // create a javascript version of this smart contract
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      // Update state, dai token gets stored here
      this.setState({ daiToken })

      // Fetch balance for this address
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })

      // Check if code works
      // console.log({ balance: daiTokenBalance });
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }
    
    // Load DappToken from abis/DappToken.json
    const dappTokenData = DappToken.networks[networkId]
    // If address exists create a web3 version of this if not alert to window
    if (dappTokenData) {
      // create a javascript version of this smart contract
      const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
      // Update state, dai token gets stored here
      this.setState({ dappToken })

      // Fetch balance for this address
      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()
      this.setState({ dappTokenBalance: dappTokenBalance.toString() })

      // Check if code works
      // console.log({ balance: dappTokenBalance });
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }
    
    // Load TokenFarm from abis/TokenFarm.json
    const tokenFarmData = TokenFarm.networks[networkId]
    // If address exists create a web3 version of this if not alert to window
    if (tokenFarmData) {
      // create a javascript version of this smart contract
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      // Update state, dai token gets stored here
      this.setState({ tokenFarm })

      // Fetch staking balance for this address
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })

      // Check if code works
       console.log({ stakingBalance: stakingBalance });
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }
  }

  // Connect the app to the blockchain
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethreum browser detected. You should consider trying MetaMask (extension) in Brave or Chrome browser')
    }

    this.setState({ loading: false })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      daiToken: {},
      dappToken: {},
      tokenFarm: {},
      daiTokenBalance: '0',
      dappTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.github.com/woutphilipsen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                <h1>Hello, DefiWorld!</h1>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
