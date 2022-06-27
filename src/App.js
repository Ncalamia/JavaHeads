import axios from 'axios'
import './App.css';
import {useState, useEffect} from 'react'
function App() {

///////////////
// States
///////////////
  const [reviews, setReviews] = useState([])

///////////////
// Connections 
///////////////

  const herokuURL = "https://javaheadsbackend.herokuapp.com/java"

  
/////////////////
//CRUD Functions
/////////////////

//Read/////////////////
  const getReviews = () => {
    axios
      .get(herokuURL)
      .then(
        (response) => setReviews(response.data),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
   }


//Create/////////////////
const handleCreate = (reviewData) => {
  axios
  .post(herokuURL, reviewData)
  .then((response) => {
    setReviews([...reviews, response.data])
  })
}


//Delete/////////////////
const handleDelete = (deletedReview) => {
  axios
  .delete(herokuURL+ deletedReview.id)
  .then((response) => {
    setReviews(reviews.filter(review => review.id !== deletedReview.id))
  })
}


//Update/////////////////
const handleUpdate = (updatedReview) => {
  axios
  .put(herokuURL + updatedReview.id, updatedReview)
  .then((response) => {
    setReviews(reviews.map((review) => {
      return review.id !== response.data.id ? review : response.data
    }))
  })
  // toggleUpdateReviewForm({})
}


   
   useEffect(() => {
    getReviews()
   }, [])


  return (
    <div>
      {reviews.map((review) => {
        return (
          <div className="review" key={review.id}>
            <h1>Name: {review.name}</h1>
            <h3>Address: {review.address}</h3>
            <h3>Review: {review.review}</h3>
            <h3>Rating: {review.rating}</h3>
            <h3>Price: {review.price}</h3>
          </div>
        )
      })}
    </div>
  );
}

export default App;
