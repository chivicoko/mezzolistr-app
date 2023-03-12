import React, { useEffect, useState } from 'react'
import axios from 'axios';


function Music() {

    const [data, setData] = useState([]);
    const [counter, setCounter] = useState(0);
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    const getData = async () => {
        try {
            const {data} = await axios.get("http://localhost:5000/");
            data.forEach(item => {
                item.forEach(singleItem => {
                    if (item[item.length - 1] === singleItem) {
                        const year = new Date(singleItem.createdAt).getFullYear();
                        const month = new Date(singleItem.createdAt).getUTCMonth();
                        const day = new Date(singleItem.createdAt).getDate();
                        const hour = new Date(singleItem.createdAt).getHours();
                        const min = new Date(singleItem.createdAt).getMinutes();
                        const sec = new Date(singleItem.createdAt).getSeconds();
                        var dateTimeString = day+'/'+ parseInt(month+1) +'/'+year+' '+hour+':'+min+':'+sec;
                        setTime(dateTimeString);
                        setData(singleItem);
                        setCounter((counter) => (counter + 1));
                        console.log(singleItem);
                    }
                });
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, [data]);

    
    return (
            <section>
                <div key={data.id}>
                    <div className="box" id="heading">
                        <h1>{data.artistName ? data.artistName : 'Name of Musician'}</h1>
                    </div>
        
                    <div className="box">
                        <img src={ data.artistImageUrl ? data.artistImageUrl : 'https://via.placeholder.com/400'} alt={data.artistName} width="400px" />
                        <p>{data.songTitle ? data.songTitle : 'Song Title'}</p>
                    </div>
        
                    <div className="box">
                        <span className="count">{counter}</span>
                    </div>
                    <div className="box">
                        <span className="count2">Last Check: {time}</span>
                    </div>
                </div>
            </section>
        )
    }

export default Music;