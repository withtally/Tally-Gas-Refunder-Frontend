import { render } from '@redwoodjs/testing'

import RefunderTableElement from './RefunderTableElement'

describe('RefunderTableElement', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RefunderTableElement />)
    }).not.toThrow()
  })
})
