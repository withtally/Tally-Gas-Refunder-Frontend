import { Link, routes } from '@redwoodjs/router'

const RefundablesPage = () => {
  return (
    <>
      <h1>RefundablesPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/RefundablesPage/RefundablesPage.js</code>
      </p>
      <p>
        My default route is named <code>refundables</code>, link to me with `
        <Link to={routes.refundables()}>Refundables</Link>`
      </p>
    </>
  )
}

export default RefundablesPage
