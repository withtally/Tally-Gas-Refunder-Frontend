import { render } from '@redwoodjs/testing'

import DeployRefunderModal from './DeployRefunderModal'

describe('DeployRefunderModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeployRefunderModal />)
    }).not.toThrow()
  })
})
