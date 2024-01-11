import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Web3, { Transaction } from 'web3';

const web3 = new Web3(process.env.APP_NODE);

@Injectable()
export class Web3Service {
  private web3: Web3;
  private privateKey: string;

  constructor() {
    this.web3 = web3;
    this.privateKey = process.env.PRIVATE_KEY;
  }

  getWeb3() {
    return this.web3;
  }

  async sendEther(to: string, amount: number) {
    // Create an Ethereum account from the private key
    const library: any = this.web3.eth.accounts.privateKeyToAccount(
      this.privateKey,
    );
    console.log(`library`);
    const address = library.address;

    // Check the account balance (optional)
    console.log(`address`, address);
    console.log(`to`, to);
    const balance = await this.web3.eth.getBalance(address);
    console.log(
      `Account balance: ${this.web3.utils.fromWei(balance, 'ether')} ETH`,
    );

    // Send Ether transaction

    const tx: Transaction = {
      from: address,
      to: to,
      value: web3.utils.toWei(amount.toString(), 'ether'),
      // gasLimit: 1000000,
      gasLimit: 100000,
      gas: 22000,
      // maxPriorityFeePerGas: web3.utils.toWei('2', 'gwei'),
      data: '0x',
      // maxFeePerGas: web3.utils.toWei('5', 'gwei'),
      nonce: await this.web3.eth.getTransactionCount(address),
      type: 0x2,
    };

    console.log(`tx`, tx);

    try {
      const signedTx = await this.web3.eth.accounts.signTransaction(
        tx,
        this.privateKey,
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
      console.log('Transaction receipt: ', receipt);
    } catch (error) {
      console.error('Error:', error);
      throw new HttpException(
        error.message || 'send eth errror',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

// 0x80ebb790cefbb94c12e79a4487b2bffd815c9c57
// 0x80ebB790cEFBb94C12E79A4487b2bffd815C9c57
