import { useCallback, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from '../comments/CommentsList'

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams()
  const {sendRequest, data, status} = useHttp(getAllComments)
  const {quoteId} = params



  useEffect(() => {
    sendRequest(quoteId)
  }, [quoteId, sendRequest])
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  

  const newCommentHandler = useCallback(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  let comments;
  if(status === 'pending'){
    comments = <div>
      <LoadingSpinner />
    </div>
  }

  if(status === 'completed' && data){
    comments = <CommentsList comments={data}/>
  }
  
  if(status === 'completed' && (!data || data.length === 0)){
    comments = <p className="centered">No comment has been added yet!</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddedComment={newCommentHandler} quoteId={quoteId} />}
      {comments}
    </section>
  );
};

export default Comments;
