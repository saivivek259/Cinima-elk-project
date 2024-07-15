import { useState } from 'react';
import React, { useEffect } from 'react';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import Sidebar from "./Sidebar";
// import './Css/Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Top_Rated = 'https://api.themoviedb.org/3/discover/movie?api_key=98af61af9b6229523244583a80603866&language=en-US&page=1'
const Now_Playing = 'https://api.themoviedb.org/3/movie/now_playing?api_key=98af61af9b6229523244583a80603866&language=en-US&page=1'
const Popular_Movies = 'https://api.themoviedb.org/3/movie/popular?api_key=98af61af9b6229523244583a80603866&language=en-US&page=1'
const Upcoming_Movies = 'https://api.themoviedb.org/3/movie/upcoming?api_key=98af61af9b6229523244583a80603866&language=en-US&page=1'

function Home() {
  const [rated , setRateds] = useState([])
  const [playing , setPlayings] = useState([])
  const [populars , setPopulars] = useState([])
  const [upcoming , setUpcomings] = useState([])
  const navigate  = useNavigate()

  useEffect(()=>{
    axios.get(Top_Rated).then((res)=>{
      setRateds(res.data.results)
     })
     
     
     axios.get(Now_Playing).then((res)=>{
      setPlayings(res.data.results)
     })
     
     
     axios.get(Popular_Movies).then((res)=>{
      setPopulars(res.data.results)
     })
     
     axios.get(Upcoming_Movies).then((res)=>{
      setUpcomings(res.data.results)
     })
  },[])
  
  return (
    <div className='home-page'>
      <Col>
      <Sidebar />
      </Col>
        
        <Row>
          <Col className='col-two' style={{padding:30 , overflowY:'scroll' , height:'90vh'}}>
              <div>
              <h3 style={{marginBottom:20, marginLeft:'15vh'}}>
                  Now Playing Movies
                </h3>
                
                <div style={{width:'97vw' , display:'flex' , overflowX:'scroll', marginLeft: '15vh'}}>
                   {
                    playing.length === 0 ? (
                          <div style={{display:"flex", justifyContent:'center', width:'100vw'}}>
                            <l-dot-pulse style={{marginTop:50}}   size="90" speed="1.3" color="black"  ></l-dot-pulse>
                          </div>
                    ):(
                     playing.map((movie , index)=>{
                      return(
                        <div key={index}>
                          <Card onClick={()=> navigate('/review/' +  movie.id  , {state : movie})} key={movie.id} style={{height:'auto', width:"8rem", overflow:'hidden',  cursor:'pointer', marginLeft:10}} className='card-movies-one'>
                            <Card.Img style={{height:140}} variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <Card.Body>
                              <Card.Title style={{fontSize:15}}>{movie.title}</Card.Title>
                            </Card.Body>
                            </Card>
                        </div>
                      )
                     })
                    )  
                   }
                </div>
              </div>
              <div>
              <h3 style={{marginBottom:20, marginTop:20 , marginLeft:'15vh'}}>
                  Popular Movies
                </h3>
                <div style={{width:'97vw', display:'flex',overflowX:'scroll', marginLeft: '15vh'}}>
                   {
                     populars.map((movie , index)=>{
                      return(
                        <Col key={index}>
                          
                            {/* <Carousel> */}
                              <Card onClick={()=> navigate('/review/' +  movie.id  , {state : movie})} style={{ width:"8rem", height:'auto', marginLeft:10, overflow:'hidden',  cursor:'pointer'}} className='card-movies-one'>
                              <Card.Img style={{height:140}} variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <Card.Body>
                              <Card.Title style={{fontSize:15}}>{movie.title}</Card.Title>
                            </Card.Body>
                            </Card>
                        </Col>
                      )
                     })
                   }
                </div>
              </div>
              <div>
              <h3 style={{marginBottom:20, marginTop:20 , marginLeft:'15vh'}}>
                  Top Rated Movies
                </h3>
                <div style={{width:'97vw', display:'flex',overflowX:'scroll' , marginLeft: '15vh'}}>
                   {
                     rated.map((movie , index)=>{
                      return(
                        <Col key={index}>
                              <Card onClick={()=>navigate('/review/' +  movie.id  , {state : movie})} style={{height:'auto', marginLeft:10, width:"8rem", overflow:'hidden',  cursor:'pointer'}} className='card-movies-one'>
                              <Card.Img style={{height:140}} variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <Card.Body>
                              <Card.Title style={{fontSize:15}}>{movie.title}</Card.Title>
                            </Card.Body>
                            </Card>
                        </Col>
                      )
                     })
                   }
                </div>
              </div>
              <div>
              <h3 style={{marginBottom:20, marginTop:20, marginLeft:'15vh'}}>
                  Upcoming Movies
                </h3>
                <div style={{width:'97vw', display:'flex',overflowX:'scroll', marginLeft: '15vh'}}>
                   {
                     upcoming.map((movie , index)=>{
                      return(
                        <Col key={index}>
                              <Card onClick={()=> navigate('/review/' +  movie.id  , {state : movie})} style={{height:'auto', width:"8rem", overflow:'hidden',  cursor:'pointer',marginLeft:10}} className='card-movies-one'>
                              <Card.Img style={{height:140}} variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <Card.Body>
                              <Card.Title style={{fontSize:15}}>{movie.title}</Card.Title>
                            </Card.Body>
                            </Card> 
                        </Col>
                      )
                     })
                   }
                </div>
              </div>
          </Col>
        </Row>
     {/* </Container> */}
    </div>
  )
}

export default Home