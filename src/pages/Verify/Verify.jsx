import React, { useContext } from 'react'
import StoreContext from "..//..//context/StoreContext"
import './Verify.css'

const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("Success")
  const orderId = searchParams.get("orderId")
  const {url} = useContext(StoreContext)


  return (
    <div className='verify'>
      
      
    </div>
  )
}

export default Verify
