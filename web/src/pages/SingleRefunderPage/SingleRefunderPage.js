import { Link, routes } from '@redwoodjs/router'

const SingleRefunderPage = () => {
  return (
    <>
      <h1>SingleRefunderPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/SingleRefunderPage/SingleRefunderPage.js</code>
      </p>
      <p>
        My default route is named <code>singleRefunder</code>, link to me with `
        <Link to={routes.singleRefunder()}>SingleRefunder</Link>`
      </p>
    </>
  )
}

export default SingleRefunderPage
