import React, {useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import QuoteForm from '../quotes/QuoteForm';
import useHttp from '../../hooks/use-http'
import {addQuote} from '../../lib/api'

const NewQuote = () => {

  const {sendRequest, status} =useHttp(addQuote);
  const history = useHistory()
  useEffect( ()=>{
    if(status === 'completed'){
      history.push('/quotes')       //push/replace redirect to new page but difference is that push allows to go back page but replace doesn't.
    }
  }, [status, history])
  const addQuoteHandler = (quoteData)=>{
    
    sendRequest(quoteData)
    // history.push('/quotes')     //push/replace redirect to new page but difference is that push allows to go back page but replace doesn't.

  }
  return (
    <QuoteForm isLoading = {status === 'pending'} onAddQuote = {addQuoteHandler} />
  )
}

export default NewQuote;