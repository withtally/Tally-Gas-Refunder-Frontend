import { render } from '@redwoodjs/testing'

import RefundablePauseUnpause from './RefundablePauseUnpause'

describe('RefundablePauseUnpause', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RefundablePauseUnpause />)
    }).not.toThrow()
  })
})
