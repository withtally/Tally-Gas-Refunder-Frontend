import { render } from '@redwoodjs/testing'

import DepositList from './DepositList'

describe('DepositList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DepositList />)
    }).not.toThrow()
  })
})
