import { render } from '@redwoodjs/testing'

import Deposit from './Deposit'

describe('Deposit', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Deposit />)
    }).not.toThrow()
  })
})
