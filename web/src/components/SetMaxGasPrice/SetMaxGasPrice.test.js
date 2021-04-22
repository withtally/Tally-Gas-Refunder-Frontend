import { render } from '@redwoodjs/testing'

import SetMaxGasPrice from './SetMaxGasPrice'

describe('SetMaxGasPrice', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetMaxGasPrice />)
    }).not.toThrow()
  })
})
