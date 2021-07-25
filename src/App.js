import { Switch, Route, Redirect } from "react-router-dom";
import AllQuotes from "./Pages/AllQuotes";
import QuotesDetail from "./Pages/QuotesDetail";
import NewQuotes from "./Pages/NewQuotes";
import Layout from "./components/layout/Layout";
import NotFound from "./Pages/NotFound";


function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/allQuotes"></Redirect>
        </Route>
        <Route exact path="/allQuotes">
          <AllQuotes />
        </Route>
        <Route path="/allQuotes/:quoteId">
          <QuotesDetail />
        </Route>
        <Route path="/NewQuotes">
          <NewQuotes />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
