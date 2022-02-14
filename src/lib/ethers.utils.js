import { ethers } from 'ethers'
import { MESSAGES, STATUS } from '../constants'

export const isWeb3Available = () =>
  typeof window !== 'undefined' && window?.ethereum

export const activateMetaMask = async () => {
  try {
    if (!isWeb3Available()) {
      return handleError({ data: { message: 'web3 not avail' } })
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const addresses = await provider.listAccounts()
    const network = await provider.getNetwork()
    const signer = await provider.getSigner()

    return {
      status: STATUS.ok,
      data: {
        provider,
        addresses,
        network,
        signer,
      },
    }
  } catch (e) {
    return handleError(e)
  }
}

export const getWallet = async (privateKey) => {
  try {
  } catch (e) {
    return handleError(e)
  }
}

export const handleSuccess = (data) => {
  return {
    status: STATUS.ok,
    data,
  }
}

const baseError = {
  status: STATUS.error,
  message: MESSAGES.defaultErrorMessage,
}

export const handleError = (e = '') => {
  if (e === '') {
    return baseError
  } else if (typeof e === 'string') {
    return {
      ...baseError,
      message: e,
    }
  } else if (e?.message) {
    return {
      ...baseError,
      message: e.message,
      e,
    }
  } else {
    const message = e.data?.message ?? MESSAGES.defaultErrorMessage
    return {
      ...baseError,
      message,
      e,
    }
  }
}
