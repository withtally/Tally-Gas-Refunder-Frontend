import { render } from '@redwoodjs/testing'

import AllRefundersPage from './AllRefundersPage'

describe('AllRefundersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AllRefundersPage />)
    }).not.toThrow()
  })
})
