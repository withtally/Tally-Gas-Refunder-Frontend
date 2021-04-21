import { render } from '@redwoodjs/testing'

import AddRefundable from './AddRefundable'

describe('AddRefundable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddRefundable />)
    }).not.toThrow()
  })
})
