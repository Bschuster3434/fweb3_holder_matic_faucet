import styled, { keyframes } from 'styled-components'
import { lightSpeedIn } from 'react-animations'
import { FaPaperPlane } from 'react-icons/fa'

import { SmallCopyButton } from './SmallCopyButton'
import { COLORS } from '../constants'

const speedIn = keyframes`${lightSpeedIn}`

const color = {
  dark: '#1C658C',
  med: '#398AB9',
  light: '#D8D2CB',
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`

const TopWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: 0.5s ${speedIn};
`
const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  animation: 0.8s ${speedIn};
`

const PaperAirplaneContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 4rem 1rem;
  justify-content: center;
  align-items: center;
  background: ${color.dark};
  border-radius: 50%;
  width: 100px;
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`

const PaperAirplane = styled((props) => <FaPaperPlane {...props} />)``

const SentText = styled.p`
  color: ${COLORS.primary};
  font-size: 2rem;
`

const TxInfo = styled.div`
  display: flex;
  font-size: 1rem;
  margin: 0;
  padding: 0;
  color: ${color.light};
`

const TxLabel = styled.p`
  margin: 0 1rem;
  padding: 0;
  color: ${color.med};
`

export const SentInfo = ({ tx }) => {
  const txTo = tx?.to || 'dunno what the tx is here'
  const txFrom = tx?.from || 'dunno tx from'
  const txR = tx?.r || 'dunno tx r'
  const txS = tx?.s || 'dunno tx s'
  return (
    <Container>
      <TopWrapper>
        <PaperAirplaneContainer>
          <PaperAirplane size={64} color={color.light} />
        </PaperAirplaneContainer>
        <SentText>Sent!</SentText>
      </TopWrapper>
      <BottomWrapper>
        <TxInfo>
          <TxLabel>To:</TxLabel>
          {txTo}
          <SmallCopyButton copyValue={txTo} />
        </TxInfo>
        <TxInfo>
          <TxLabel>From:</TxLabel>
          {txFrom}
          <SmallCopyButton copyValue={txFrom} />
        </TxInfo>
        <TxInfo>
          <TxLabel>TXS:</TxLabel>
          {txS}
          <SmallCopyButton copyValue={txS} />
        </TxInfo>
        <TxInfo>
          <TxLabel>TXR:</TxLabel>
          {txR}
          <SmallCopyButton copyValue={txR} />
        </TxInfo>
      </BottomWrapper>
    </Container>
  )
}
