import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import { isWeb3Available } from './eth.utils'

const defaultState = {
  connecting: false,
  address: null,
  error: '',
}

export const useEthers = () => {
  const [state, setState] = useState(defaultState)

  const activate = async () => {
    try {
      if (isWeb3Available) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        setState({ ...state, connecting: true, error: '' })
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setState({ ...state, connecting: false, provider, signer, address })
      }
    } catch (e) {
      setState({ ...state, error: e.message })
    }
  }
  return { ...state, activate }
}
