// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import SiteLayoutLayout from 'src/layouts/SiteLayoutLayout'

const Routes = () => {
  return (
    <Router>
    <Set wrap={SiteLayoutLayout}>
      <Route path="/create-refunder" page={CreateRefunderPage} name="createRefunder" />
      <Route path="/single-refunder" page={SingleRefunderPage} name="singleRefunder" />
      <Route path="/all-refunders" page={AllRefundersPage} name="allRefunders" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
