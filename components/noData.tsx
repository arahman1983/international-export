import Lottie from 'react-lottie';
import no from '../animationJson/no.json'

export default function NoData({message}){
  return(
    <div style={{marginTop:'-50px'}} className="w-100 d-flex flex-column justify-content-center align-items-center">
      <Lottie options={{
        loop: true,
        autoplay: true,
        animationData: no,
      }}
        height={300}
        width={300}
      />
      <h5 style={{marginTop:'-80px'}} className="text-secondary">{message}</h5>
    </div>
  )
}