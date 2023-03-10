import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { track } from 'dic';


function Music() {

    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const {data} = await axios.get("http://localhost:5000/");
            data.forEach(item => {
                let index = 0;
                const loopName = setInterval(() => { 
                    if (index === item.length) {
                        index = 0;
                    }
                    var singleList = item[index++];
                    if (singleList.artistName.search("Bob Marley") || singleList.artistName.search("Brenda Fassie") || singleList.artistName.search("Fela Kuti")) {
                        setData(singleList);
                    }
                }, 10000);
            });

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    return (
            <section>
                <div>
                    <div className="box" id="heading">
                        <h1>{data.artistName ? data.artistName : 'Name of Musician'}</h1>
                    </div>
        
                    <div className="box">
                        <img src={ data.artistImageUrl ? data.artistImageUrl : 'https://via.placeholder.com/400'} alt={data.artistName} width="400px" />
                        <p>{data.songTitle ? data.songTitle : 'Song Title'}</p>
                    </div>
        
                    <div className="box">
                        <span className="count">200</span>
                    </div>
                    <div className="box">
                        <span className="count2">Last Check: {new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1')}</span>
                    </div>
                    {/* <footer>Copyright &copy;2023 The WebzTor</footer> */}
                </div>
            </section>
          )
        }

export default Music;