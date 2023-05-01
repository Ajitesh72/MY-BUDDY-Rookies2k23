import React from 'react'

function PersonCard(props) {
     console.log(props.allData);
    let base64String;
    if (props.allData.image && props.allData.image instanceof Uint8Array) {
        base64String = btoa(
            String.fromCharCode(...new Uint8Array(props.allData.image))
        );
    }
    // Do something with the base64String


    return (
        <div className='card-master'>
            <div className='card-left-image'>
                <img src={`data:image/png;base64,${base64String}`} width="100" alt="" />
            </div>
            <div className='card-right-image'>
                <p className='person-name person-text'>{props.allData.name}</p>
                <p className='person-email-id person-text'>{props.allData.email}</p>
                <p className='person-role person-text'>{props.allData.role}</p>
                <p className='person-profession person-text'>{props.allData.profession}</p>
                <p className='person-about person-text'>{props.allData.about}</p>
            </div>
            <div className='button-div'>
                <div className="verification-btn accept-btn" onClick={() =>{props.acceptOnclick(props.allData.email,props.allData.role)}}>ACCEPT</div>
                <div className="verification-btn reject-btn" onClick={() =>{props.rejectOnclick(props.allData.email,props.allData.role)}}>REJECT</div>
            </div>
        </div>
    )
}

export default PersonCard