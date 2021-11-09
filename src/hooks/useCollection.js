import { useState, useEffect, useRef } from 'react'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  //why we are using the useRef to just using the same value?
  //--- It is because if we directly use the prop _query which is an array and a referrence type value so passing it in the useEffect dependency list will cause the component to rerender and as a result a infinite loop will be created.
  //As we are using the query useRef so it will not be caring about the referrence but the calue only
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    let ref = projectFirestore.collection(collection)

    if (query) {
      ref = ref.where(...query)
    }

    //When we first time do this the firestore will ask ask to add index and the way to add the index can be found in the console (direct hyperlink will be given)
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    const unsubscribe = ref.onSnapshot(
      //this first argument for onSnapshot will trigger everytime there is any change
      (snapshot) => {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id })
        })
        setDocuments(results)
        setError(null)
      },
      (err) => {
        console.log(err)
        setError('Unable to fetch the data.')
      }
    )

    return () => unsubscribe()
  }, [collection, query, orderBy])

  return { documents, error }
}

export default useCollection
