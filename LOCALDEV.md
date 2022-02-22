# Local Development

---

### Install deps

```bash
yarn
```

---

### copy .env.example to .env

```bash
cp .env.example .env
# Make sure REACT_APP_ETH_NETWORK=localhost
```

---

### Start local node

```bash
yarn hh:node

# Starts local node. Leave running.
# Fill in REACT_APP_LOCALNET_DEPLOYER_ACCOUNT_PRIK with account 0 prik (default deployer for localhost)
# Fill in REACT_APP_LOCALNET_USER_ACCOUNT_PUB with account 1 pub key
```
---

### Deploy token

```bash
# uses REACT_APP_ETH_NETWORK to select network. be sure it's blank or localhost
yarn hh:deploy:token
# Fill in REACT_APP_LOCALNET_REQUIRED_TOKEN_CONTRACT_ADDRESS with token address
```

---

### Connect localnet / account to MM
- connect to localnet (you may need to enable testnets)
- add account 1 privk to metamask
- add token contract address to metamask

---

### Send required tokens

```bash
yarn send:tokens local

```

This will transfer 100 required tokens to `REACT_APP_LOCALNET_USER_ACCOUNT_PUB`

---

### Fill faucet with eth

```bash
yarn fill:faucet local
```

# Testing

```bash
# All tests
yarn test
# FE only
yarn test:fe
# FE in watch mode
yarn test:fe:watch
# Contracts only
yarn test:hh
```
