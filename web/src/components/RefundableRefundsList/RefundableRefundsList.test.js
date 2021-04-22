import { render } from '@redwoodjs/testing'

import RefundableRefundsList from './RefundableRefundsList'

describe('RefundableRefundsList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RefundableRefundsList />)
    }).not.toThrow()
  })
})
