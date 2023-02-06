import React, { useState } from 'react'

function Mehdi() {
    async function fetchsomething(){
        const response = await fetch("http://localhost:1337/api/mehdi",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            name : "i am mehdi"
            }),
        });
        const data = await response.json();
        console.log(data)
    }
    return (
        <div>
            <button onClick = {fetchsomething} >Fetch something</button>
        </div>
    )
}

export default Mehdi