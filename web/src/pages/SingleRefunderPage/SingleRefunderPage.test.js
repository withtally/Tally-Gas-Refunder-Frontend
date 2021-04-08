import { render } from '@redwoodjs/testing'

import SingleRefunderPage from './SingleRefunderPage'

describe('SingleRefunderPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SingleRefunderPage />)
    }).not.toThrow()
  })
})
