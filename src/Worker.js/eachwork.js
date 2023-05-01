import React from 'react'
import "../styles/findwork.css"

function Eachwork({WorkData , sendBothEmail}) {
    console.log(WorkData)
    // let base64String
    // if (WorkData.image) {
    //     base64String = btoa(
    //         String.fromCharCode(...new Uint8Array(WorkData.image.data.data))
    //     )
    // }
    return (
        <div className="each-work-master">
            {/* <img  className='client-image' src = {`data:image/png;base64,${base64String}`} alt="img Loading" /> */}
            <p className='client-name'>Name: {WorkData.name}</p>
            <p className='client-email'>Email: {WorkData.email}</p>
            <p className='profession-req'>Profession: {WorkData.professionRequired}</p>
            <p className='job-description'>Job Requirement: {WorkData.jobRequired}</p>
            <button className='send-req-button' onClick={(e)=>{sendBothEmail(e,WorkData.email)}} >SEND REQUEST</button>
        </div>
    )
}

export default Eachwork