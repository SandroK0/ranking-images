import './App.css';
import { useState,useEffect } from 'react';
import firebase from './Firebase';


function App(){

    const [data, setdata] = useState([])
    const [loader, setloader] = useState(true)

    firebase.firestore().collection("images").orderBy("rating", "desc").limit(10).onSnapshot((snapshot) => {
        const item = []
    snapshot.forEach((doc) =>{
        item.push(doc.data())
    
    })
    setdata(item)
    setloader(false)


 
    });


    return (
        
        <div className='App'>
            <h1>leaderboard</h1>
            <div className='flex'>
            {loader === false && (data.map((data) => (
            
                <div className='item'>
                    <img src={data.url} className='img-board'></img>
                    <br></br>
                    <label className='font'>Rating: {Math.floor(data.rating)}</label>
                </div>
            )))}
            </div>

        </div>
    )


}

export default App