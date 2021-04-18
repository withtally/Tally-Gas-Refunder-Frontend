import { render } from '@redwoodjs/testing'

import CreateRefunder from './CreateRefunder'

describe('CreateRefunder', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateRefunder />)
    }).not.toThrow()
  })
})
