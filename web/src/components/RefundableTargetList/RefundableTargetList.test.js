import { render } from '@redwoodjs/testing'

import RefundableTarget from './RefundableTargetList'

describe('RefundableTarget', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RefundableTarget />)
    }).not.toThrow()
  })
})
