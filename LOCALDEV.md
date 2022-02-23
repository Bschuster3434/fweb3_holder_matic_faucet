# Local Development
---

1. install deps

```bash
yarn
```

---

2. copy .env.example to .env

```bash
cp .env.example .env
```
---

3. Start local node

```bash
yarn hh:node
```

This starts the local node. Leave running in its own terminal.
Fill in `REACT_APP_LOCALNET_DEPLOYER_ACCOUNT_PRIK` with prik from account 0 (this is the default deploy account for localnet)

---

4. Deploy both token and faucet contracts

```bash
yarn deploy:local
```

Take note of the token address and faucet address.
Fill in `REACT_APP_TOKEN_CONTRACT_ADDRESS` and `REACT_APP_FAUCET_CONTRACT_ADDRESS`
with the output of deploy

---

5. Init local development

```bash
yarn init:local
```

This will transfer 100 test tokens to account 1

6. Import account 1 into metamask and change to local RPC network
