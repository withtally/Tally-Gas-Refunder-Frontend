import { render } from '@redwoodjs/testing'

import Withdraw from './Withdraw'

describe('Withdraw', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Withdraw />)
    }).not.toThrow()
  })
})
