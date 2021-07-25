import { useEffect } from 'react'
import QuoteList from '../components/quotes/QuoteList'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import NoQuotesFound from '../components/quotes/NoQuotesFound'
import useHttp from '../hooks/use-http'
import { getAllQuotes } from '../lib/api'




const AllQuotes = () => {
    const {sendRequest, data, status, error} = useHttp(getAllQuotes, true)
    useEffect(() => {
        sendRequest()
    }, [sendRequest])


    if(status=== 'pending'){
        return <div className="centered">
            <LoadingSpinner />
        </div>
    }
    if(error){
        return <p className="centered focused">{error}</p>
    }
    if(status === 'completed' && (!data || data.length === 0)){
        return <div>
            <NoQuotesFound />
        </div>
    }

    return <QuoteList quotes={data}/>
}

export default AllQuotes