import { AbstractContractCaller } from '../../AbstractContractCaller'
import { Contract } from 'ethers'

const contractAddress = '0xf782376d8327df7f6040fce2f871dF3bA3d047B5'

class Banksea extends AbstractContractCaller {
  constructor(network: string, signer: any, provider: any) {
    super()
    this.network = network
    this.signer = signer
    this.provider = provider

    this.contract = new Contract(
      contractAddress,
      require('./Banksea.json').abi,
      signer || provider
    )
  }

  async awardItem(address: string, tokenUri: string) {
    return this.contract!.awardItem(address, tokenUri)
  }

  async isApprovedForAll(owner: string, operator: string) {
    return await this.contract!.isApprovedForAll(owner, operator)
  }

  async setApprovalForAll(operator: string, approved: boolean) {
    return await this.contract!.setApprovalForAll(operator, approved)
  }
}

export default Banksea
