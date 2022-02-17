import styled from 'styled-components'

const TitleText = styled.h1`
  font-size: 3rem;
  align-self: center;
  margin: 0;
`
const NetworkText = styled.h3`
  font-size: 1rem;
  align-self: center;
  color: lime;
  margin-bottom: 1rem;
`
export const Title = ({ networkName }) => (
  <>
    <TitleText>fWeb3 MATIC Faucet</TitleText>
    {networkName && <NetworkText>Connected to: {networkName}</NetworkText>}
  </>
)
