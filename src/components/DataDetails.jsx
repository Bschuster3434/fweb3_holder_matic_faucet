export const DataDetails = ({
    addresses,
    ERC20MinTokens
}) => {
    return (
      <div>
          <h3>Address of Faucet Account: {addresses[0]}</h3>
          <h3>ERC20 Min Tokens Required: {ERC20MinTokens}</h3>
      </div>
    ) 
  }
  