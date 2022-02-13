import styled from 'styled-components'
import { COLORS } from '../constants'

const DataContainer = styled.div`
  align-self: center;
`

const FaucetContractAddressText = styled.p`
  color: ${COLORS.secondary},
  font-size: 1rem;
`
export const DataDetails = (ethersState) => {
  const {
    addresses,
    contractAddress,
    network,
    ERC20MinTokens,
    connected,
    contractBalance,
  } = ethersState
  const detailsToShow = {
    account: addresses[0],
    network: network?.name,
    ERC20MinTokens,
    connected,
    contractBalance,
  }
  return (
    <DataContainer>
      <FaucetContractAddressText>
        Faucet Contract: {contractAddress}
      </FaucetContractAddressText>
      <pre>{JSON.stringify(detailsToShow, null, 2)}</pre>
    </DataContainer>
  )
}
