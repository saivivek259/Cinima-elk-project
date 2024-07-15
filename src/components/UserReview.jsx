import axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react'
import { Card } from 'react-bootstrap'
import ReadMoreButton from './ReadMoreButton'
import { useNavigate } from 'react-router-dom'

const User_Review_Api = 'https://api.themoviedb.org/3/trending/person/day?api_key=98af61af9b6229523244583a80603866&en-US&page=1'

export default function UserReview() {

  const navigate = useNavigate()
  const [userReview, setUserReview] = useState([])
    
  useEffect(() => {
    axios.get(User_Review_Api)
      .then((res) => {
        console.log(res.data.results)
        setUserReview(res.data.results)
      })
      .catch((error) => {
        console.error('Error fetching user reviews:', error)
      })
  }, [])
   

  return (
    <div style={{ width: '100vw', padding: 40, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', height: '100vh', overflowY: 'scroll' }}>
      {userReview.map((item, index) => (
        <div key={index}>
          <Card style={{ width: "30rem", height: "auto", display: 'flex', margin: 20, padding: 20, cursor: 'pointer' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '20rem', padding: 5 }}>
                <div onClick={() => navigate('/user/' + item.id, { state: item, img: item.profile_path })} key={item.id} style={{ borderBottom: 'gray 2px solid' }}>
                  <Card.Img className='d-inline-block' style={{ width: 30, height: 30, borderRadius: "50%" }} src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} />
                  <Card.Title className='d-inline-block' style={{ fontSize: 20, marginLeft: 25 }}>{item.name}</Card.Title>
                </div>
                <Card.Text style={{ marginTop: 10 }}>User In Numbars Rating : {item.known_for[0]?.vote_average}</Card.Text>
                <ReadMoreButton text={item.known_for[0]?.overview} maxLength={50} />
              </div>
              <div style={{ display: 'flex' }}>
                <Card.Img width={300} height={150} src={`https://image.tmdb.org/t/p/w500${item.known_for[0]?.poster_path}`} />
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
