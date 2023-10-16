import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as EtherJs from 'ethers';

@Injectable()
export class EtherJsService {
  private privateKey: string;
  private provider: EtherJs.JsonRpcProvider;
  private wallet: EtherJs.Wallet;
  private walletSigner: EtherJs.Wallet;

  constructor() {
    this.privateKey = process.env.PRIVATE_KEY;
    this.provider = new EtherJs.JsonRpcProvider(process.env.APP_NODE);

    this.wallet = new EtherJs.Wallet(this.privateKey);
    this.walletSigner = this.wallet.connect(this.provider);
  }

  async sendEther(to: string, amount: number) {
    const address = await this.walletSigner.getAddress();
    const balance = await this.provider.getBalance(address);

    if (amount > +EtherJs.formatEther(balance)) {
      throw new HttpException('Insufficient funds', HttpStatus.BAD_REQUEST);
    }

    const tx = {
      to,
      value: EtherJs.parseEther(amount.toString()),
      gasLimit: 21000, // Gas limit for a standard transaction
    };

    // console.log(tx);

    const transactionResponse = await this.walletSigner
      .sendTransaction(tx)
      .then((transaction) => {
        console.log(`send success ${to} : ${amount} ETH ${transaction.hash}`);
        return transaction;
      })
      .catch((error) => {
        console.log(error);
        throw new HttpException(error.mesasge, HttpStatus.BAD_REQUEST);
      });
    await transactionResponse.wait();
  }
}

// 0x80ebb790cefbb94c12e79a4487b2bffd815c9c57
// 0x80ebB790cEFBb94C12E79A4487b2bffd815C9c57
