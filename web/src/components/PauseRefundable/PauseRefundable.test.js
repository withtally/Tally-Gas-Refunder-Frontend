import { render } from '@redwoodjs/testing'

import PauseRefundable from './PauseRefundable'

describe('PauseRefundable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PauseRefundable />)
    }).not.toThrow()
  })
})
