import { render } from '@redwoodjs/testing'

import SiteLayoutLayout from './SiteLayoutLayout'

describe('SiteLayoutLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SiteLayoutLayout />)
    }).not.toThrow()
  })
})
