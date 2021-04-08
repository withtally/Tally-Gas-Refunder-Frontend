import { render } from '@redwoodjs/testing'

import CreateRefunderPage from './CreateRefunderPage'

describe('CreateRefunderPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateRefunderPage />)
    }).not.toThrow()
  })
})
