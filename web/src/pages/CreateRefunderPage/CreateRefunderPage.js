import { Link, routes } from '@redwoodjs/router'
import { useEthers} from "@usedapp/core"
const CreateRefunderPage = () => {

  const {} = useEthers()
  return (
    <>
      <h1>CreateRefunderPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/CreateRefunderPage/CreateRefunderPage.js</code>
      </p>
      <p>
        My default route is named <code>createRefunder</code>, link to me with `
        <Link to={routes.createRefunder()}>CreateRefunder</Link>`
      </p>
    </>
  )
}

export default CreateRefunderPage
