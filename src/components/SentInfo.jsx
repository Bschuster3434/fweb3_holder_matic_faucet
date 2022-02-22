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
  justify-content: center;
  align-items: center;
  animation: 1.5s ${speedIn};
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

const TxInfo = styled.p`
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
  // FIXME: remove
  const txId = '0xb15A3D29eFe51baaC8d3cd2f4F747B843FeAdA7d'
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
          <TxLabel>TX:</TxLabel>
          {txId}
          <SmallCopyButton copyValue={txId} />
        </TxInfo>
      </BottomWrapper>
    </Container>
  )
}
