import styled from 'styled-components'

const { REACT_APP_ETH_NETWORK } = process.env

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  color: #6669;
`

export const Footer = () => {
  return (
    <FooterContainer>
      <p>{REACT_APP_ETH_NETWORK} </p>
    </FooterContainer>
  )
}
