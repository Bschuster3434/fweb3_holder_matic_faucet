# MATIC Faucet for FWEB3 Holders
A MATIC faucet for [the FWEB3 Community](https://fweb3.xyz/)

This is a Smart Contract deployed onto the Polygon Network (Contract Address TBD).
Users will be able to request tokens from this contract in order to be able to send transactions on the Polygon Network.

## Local Development: see LOCALDEV.md
## Usage

FWEB3 holders will be able to call the 'faucet' function with their address in order to receive a pre-determined amount of MATIC.

After they call the 'faucet' function, they will not be able to use the faucet again for a pre-determined amount of time.

After the time has elapsed, they can call 'faucet' again to receive a pre-determined amount of MATIC.

Must hold a pre-determined amount of FWEB3 to be able to use the faucet function.
## Possible Variables

- Increment of MATIC to Send: .1 MATIC
- Timeout for the Faucet: 24 Hours (or equivalent blocks)
- Amount of FWEB3 to use the Faucet: 300 FWEB3
## Token Development

What should the contract be able to do?

- When sent money, the native token of the network will be made part of the faucet
- When someone asks for money, the faucet needs to check the address of the account to make sure they haven't received tokens in the last 24 Hours AND that they are a FWEB3 token holder. 
- After that, they will then be sent a pre-determined amount of MATIC and a new timestamp will be added to hash to notify when they are allowed to receive again
- If the faucet is empty, it returns an error
- If the users has received tokens recently, it returns an error

---
## Future To Do Items
- Get a Github Actions Pipeline Setup
- Support Environment Variables to Switch Out Contracts in Dev, Test and Prod
