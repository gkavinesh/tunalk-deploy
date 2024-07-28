import React, { useContext,useNavigate } from 'react'
import StoreContext from "..//..//context/StoreContext"
import './Verify.css'

const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("Success")
  const orderId = searchParams.get("orderId")
  const {url} = useContext(StoreContext)
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url+"api/order/verify",{success,orderId})
    if(response.data.success){
      navigate("/myorders");
    }else{
      navigate("/")
    }
  }


  return (
    <div className='verify'>
      <div className='verify'></div>
    </div>
  )
}

export default Verify
