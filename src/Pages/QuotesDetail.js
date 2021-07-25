import { useEffect } from "react";
import { useParams, Route, Link } from "react-router-dom";
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";


const QuotesDetail = () => {
    const params = useParams()
    const {sendRequest, data, status, error} = useHttp(getSingleQuote, true)

    useEffect(()=> {
      sendRequest(params.quoteId)
    }, [params.quoteId, sendRequest])
    const quote = data

    if(status === 'pending'){
      return <div className="centered">
        <LoadingSpinner />
      </div>
    }
    if(error){
      return <p className="centered focused">{error}</p>
  }
    if(!quote){
      return <h1>Quote not found</h1>
    }

  return <>
  <HighlightedQuote text={quote.text} author={quote.author}/>
  <Route exact path={`/allQuotes/${params.quoteId}`}>
    <div className='centered'>
      <Link className="btn--flat" to={`/allQuotes/${params.quoteId}/comments`}>
      Load comments
      </Link>
    </div>
  </Route>
  <Route path={`/allQuotes/${params.quoteId}/comments`}>
      <Comments />
  </Route>
  </>
  
};

export default QuotesDetail;
