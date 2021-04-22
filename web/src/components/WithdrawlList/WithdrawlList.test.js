import { render } from '@redwoodjs/testing'

import WithdrawlList from './WithdrawlList'

describe('WithdrawlList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WithdrawlList />)
    }).not.toThrow()
  })
})
