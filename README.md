# MATIC Faucet for FWEB3 Holders
A MATIC faucet for [the FWEB3 Community](https://fweb3.xyz/)

This is a Smart Contract deployed onto the Polygon Network (Contract Address TBD).
Users will be able to request tokens from this contract in order to be able to send transactions on the Polygon Network.

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
## Front End React
- node v16
- React 17

Set ENV vars
- `REACT_APP_FAUCET_ACCOUNT_PRIVATE_KEY` - get this from MetaMask
- `REACT_APP_FAUCET_CONTRACT_ADDRESS` - The address on Polygon Network is `0x67806adca0fD8825DA9cddc69b9bA8837A64874b`

```bash
# use node v16
nvm use
# install deps
yarn install
# run dev server
yarn start
# build prod
yarn build
```
## Front End Notes / Tooling:

Use yarn for preformance optimizations over npm
- [yarn](https://yarnpkg.com/)

Use nvm for managing node version
- [nvm](https://github.com/nvm-sh/nvm)


---

# Local Development
```bash
# start local network node (leave running, note the accounts)
yarn hard:node
# deploy the test token (need this address for faucet deploy)
yarn deploy:token
# Update / create .env file at the root using .env.example as a guide. fill in
# you will only have the token address at this point. fill that in the .env
# will create a `tmp/token_deploy_info` file with all the info
cp .env.example .env
# deploy the faucet (make sure your token address is filled in the env!)
yarn deploy:faucet
# This will create a `tmp/faucet_deploy_info` file with all the info about the faucet deploy.
# Fill in the faucet contract address in .env

# Grab a private key from the node server running in another terminal from step one.
# TODO: Figure out how to programatically send the created token to the test account.
# Gonna have to connect MM to local.

```

## Future To Do Items
- Get a Github Actions Pipeline Setup
- Support Environment Variables to Switch Out Contracts in Dev, Test and Prod
