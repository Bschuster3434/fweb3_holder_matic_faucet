import { STATUS, MESSAGES } from '../constants'
import * as ethersUtils from './ethers.utils'

jest.mock('ethers')

describe('ethers utils', () => {
  describe('fweb3 metamask activation', () => {
    it('erros if web3 not avail', async () => {
      window.ethereum = false
      const expected = {
        e: { data: { message: 'web3 not avail' } },
        message: 'web3 not avail',
        status: 'error',
      }
      const actual = await ethersUtils.activateMetaMask()
      expect(actual).toEqual(expected)
    })

    it('connects metamask', async () => {
      window.ethereum = true
      const expected = ['provider', 'addresses', 'network', 'signer']
      const actual = await ethersUtils.activateMetaMask()
      expect(Object.keys(actual)).toEqual(expected)
    })
  })
  describe('success handler', () => {
    it('adds status and data', () => {
      const expected = { status: STATUS.ok, data: { foo: 'bar' } }
      const actual = ethersUtils.handleSuccess({ foo: 'bar' })
      expect(actual).toEqual(expected)
    })
  })
  describe('error handler', () => {
    it('gives generic error if none given', () => {
      const actual = ethersUtils.handleError()
      expect(actual).toEqual({
        status: STATUS.error,
        message: MESSAGES.defaultErrorMessage,
      })
    })

    it('gives passed in error if not error object', () => {
      const actual = ethersUtils.handleError('im a teapot')
      expect(actual).toEqual({ status: STATUS.error, message: 'im a teapot' })
    })

    it('formats javascript error', () => {
      const actual = ethersUtils.handleError({ message: 'foo' })
      expect(actual).toEqual({
        status: STATUS.error,
        message: 'foo',
        e: { message: 'foo' },
      })
    })

    it('formats ethers error', () => {
      const actual = ethersUtils.handleError({ data: { message: 'bar' } })
      const expected = {
        status: STATUS.error,
        message: 'bar',
        e: { data: { message: 'bar' } },
      }
      expect(actual).toEqual(expected)
    })

    it('formats unknown type error', () => {
      const actual = ethersUtils.handleError({ data: { unknown: 'baz' } })
      const expected = {
        status: STATUS.error,
        message: MESSAGES.defaultErrorMessage,
        e: { data: { unknown: 'baz' } },
      }
      expect(actual).toEqual(expected)
    })
  })
})
