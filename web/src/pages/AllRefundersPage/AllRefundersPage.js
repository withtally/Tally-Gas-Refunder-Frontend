import { Link, routes } from '@redwoodjs/router'

const AllRefundersPage = () => {
  return (
    <>
      <h1>AllRefundersPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/AllRefundersPage/AllRefundersPage.js</code>
      </p>
      <p>
        My default route is named <code>allRefunders</code>, link to me with `
        <Link to={routes.allRefunders()}>AllRefunders</Link>`
      </p>
    </>
  )
}

export default AllRefundersPage
