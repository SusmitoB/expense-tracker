import { useEffect, useReducer, useState } from 'react'
import { projectFirestore, timestamp } from '../firebase/config'
import { ADDED_DOCUMENT, DELETE_DOCUMENT, ERROR, IS_PENDING } from '../constants'

const initState = {
  error: null,
  success: null,
  isPending: false,
  document: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case IS_PENDING:
      return { ...initState, isPending: true, success: false }
    case ADDED_DOCUMENT:
      return { document: action.payload, isPending: false, success: true, error: null }
    case DELETE_DOCUMENT:
      return { document: null, isPending: false, success: true, error: null }
    case ERROR:
      return { document: null, isPending: false, success: false, error: action.payload }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initState)
  const [isCancelled, setIsCancelled] = useState(false)

  //collection ref
  const ref = projectFirestore.collection(collection)

  //only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  //add a document
  const addDocument = async (doc) => {
    dispatch({ type: IS_PENDING })
    try {
      //createdAt gives the timestamp at which the document is added
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: ADDED_DOCUMENT, payload: addedDocument })
    } catch (err) {
      dispatchIfNotCancelled({ type: ERROR, payload: err.message })
    }
  }

  //delete a document
  const deleteDocument = async (id) => {
    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: DELETE_DOCUMENT })
    } catch (err) {
      dispatchIfNotCancelled({ type: ERROR, payload: 'Could not delete the transaction.' })
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}

export default useFirestore
