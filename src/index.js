import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from './Firebase';







const root = ReactDOM.createRoot(document.getElementById('root'));
//Roots
const img1 = ReactDOM.createRoot(document.getElementById('img_1'))
const img2 = ReactDOM.createRoot(document.getElementById('img_2'))
const rating_frame_1 = ReactDOM.createRoot(document.getElementById('rating_frame_1'))
const rating_frame_2 = ReactDOM.createRoot(document.getElementById('rating_frame_2'))
// Image Buttons
const imgbtn1 = document.getElementById('img_1')
const imgbtn2 = document.getElementById('img_2')



//leaderboard
// const leaderboard = ReactDOM.createRoot(document.getElementById('leaderboard'))

// leaderboard.render(<App></App>)

// Collection reference

root.render(<App></App>)

const ref = firebase.firestore().collection("images")

ref.get().then(snap => {
  let lenght = snap.size
  console.log(lenght)
  display(lenght)
})







//Ranking 
const k = 30;

function Probability(rating1, rating2) {
  return (
    (1.0 * 1.0) / (1 + 1.0 * Math.pow(10, (1.0 * (rating1 - rating2)) / 400))
  );
}

function EloRating(Ra, Rb, K, d, id_1, id_2) {
    // To calculate the Winning
    // Probability of Player B
    let Pb = Probability(Ra, Rb);
  
    // To calculate the Winning
    // Probability of Player A
    let Pa = Probability(Rb, Ra);

    // Case 1 When Player A wins
    // Updating the Elo Ratings
    if (d === 1) {
      Ra = Ra + K * (1 - Pa);
      Rb = Rb + K * (0 - Pb);
    }
    
    // Case 2 When Player B wins
    // Updating the Elo Ratings
    else {
      Ra = Ra + K * (0 - Pa);
      Rb = Rb + K * (1 - Pb);
    }

    ref.doc(id_1).update({"rating" : Ra})
    ref.doc(id_2).update({"rating" : Rb})

    
    
    
  }



function display(lenght) {


  function getRandomImages(lenght){
    let id_1;
    let id_2;
    while(true){
      id_1 = String(Math.round(Math.random() * lenght));
      id_2 = String(Math.round(Math.random() * lenght));
      if (id_1 !== id_2){
        return [id_1, id_2]
      }
    }
      
    
      
    
    
  
    
  }
    
  
  let id1 = getRandomImages(lenght)[0]
  console.log(id1)
   
  let id2 = getRandomImages(lenght)[1]
  console.log(id2)
   

  let image_1 = ref.doc(id1)
  let image_2 = ref.doc(id2)


  image_1.get().then((doc) => {
    if (doc.exists) {
        
  
        let url = doc.data().url
        let rating = doc.data().rating
  
        img1.render(<img className="image" src={url}></img>)
        rating_frame_1.render(<label id="rating1">Rating:{Math.floor(rating)}</label>)
  
  
    } else {
        // doc.data() will be undefinez in this case
        console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
  
  image_2.get().then((doc) => {
    if (doc.exists) {
        
  
        let url = doc.data().url
        let rating = doc.data().rating
  
        img2.render(<img className="image" src={url}></img>)
        rating_frame_2.render(<label id="rating2">Rating:{Math.floor(rating)}</label>)
  
  
    } else {
        // doc.data() will be undefinez in this case
        console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });

  imgbtn1.onclick = function(){
    
    

    let d = 1

    image_1.get().then((doc) =>{
      
      let Ra = doc.data().rating
      
      
      image_2.get().then((doc) =>{
        
        let Rb = doc.data().rating
        
        
        EloRating(Ra, Rb, k, d, id1, id2)

        
      })
    })

    
  
    display(lenght)
  }
  
  imgbtn2.onclick = function(){
    

    let d = 0

    image_1.get().then((doc) =>{
      
      let Ra = doc.data().rating
      
      
      image_2.get().then((doc) =>{
        
        let Rb = doc.data().rating
        
        
        EloRating(Ra, Rb, k, d, id1, id2)

        
      })
    })

    display(lenght)
  }

}



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
