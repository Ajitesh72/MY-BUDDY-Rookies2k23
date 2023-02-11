import React, { useState } from 'react'
import { Document, Page } from 'react-pdf';


function Mehdi() {

    const [workerImg, setWorkerImg] = useState([])

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    async function getuserData() {
        const response = await fetch("http://localhost:1337/api/mehdigetdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        const data = await response.json();
        console.log(data)
    }

    async function getallworkers() {
        const response = await fetch("http://localhost:1337/api/getWorkers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        const fetchedData = await response.json();
        console.log(fetchedData)
        setWorkerImg(fetchedData)
    }


    return (
        <div>
            <button onClick={getuserData} >Fetch something</button>
            <button onClick={getallworkers} >GET WORKERS</button>
            {workerImg.map((singleData) => {
                if(singleData.image){
                    const base64String = btoa(
                        String.fromCharCode(...new Uint8Array(singleData.image.data.data))
                    )
                    console.log(base64String)
                    return (<img src={`data:image/png;base64,${base64String}`} width="100" />)
                }
            })}

            {/* {workerImg.map((singleData) => {
                const base64String = btoa(
                    String.fromCharCode(...new Uint8Array(singleData.image.data.data))
                )
                // return (<img src={`data:image/png;base64,${base64String}`} width="100" />)
                return (
                    <Document file={base64String} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                )
            })} */}
        </div>
    )
}

export default Mehdi