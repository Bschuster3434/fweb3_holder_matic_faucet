import * as fweb3 from './fweb3'

jest.mock('ethers')

it('gets fweb3 wallet', async () => {
  const actual = await fweb3.getFaucetWallet()
  expect(actual).toBeTruthy()
})
