import React from 'react'

function Eachwork({WorkData , sendBothEmail}) {
    let base64String
    if (WorkData.image) {
        base64String = btoa(
            String.fromCharCode(...new Uint8Array(WorkData.image.data.data))
        )
    }
    return (
        <div className="each-work-master">
            <img  className='client-image' src = {`data:image/png;base64,${base64String}`} alt="img Loading" />
            <p className='client-name'>{WorkData.name}</p>
            <p className='client-email'>{WorkData.email}</p>
            <p className='profession-req'>{WorkData.professionRequired}</p>
            <p className='job-description'>{WorkData.jobRequired}</p>
            <button className='send-req-button' onClick={(e)=>{sendBothEmail(e,WorkData.email)}} >SEND REQUEST</button>
        </div>
    )
}

export default Eachwork