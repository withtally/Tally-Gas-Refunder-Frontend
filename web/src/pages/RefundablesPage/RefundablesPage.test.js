import { render } from '@redwoodjs/testing'

import RefundablesPage from './RefundablesPage'

describe('RefundablesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RefundablesPage />)
    }).not.toThrow()
  })
})
