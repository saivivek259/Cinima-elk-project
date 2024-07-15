import { deleteDoc, updateDoc, getDoc } from 'firebase/firestore';

import { useState, useEffect } from 'react';
import { auth, db } from '../Firebase';
import { collection, getDocs, addDoc, doc, onSnapshot } from 'firebase/firestore';
import { Button, Card } from 'react-bootstrap';
import ReadMoreButton from './ReadMoreButton';

import Deletebutton from '../assets/Deletebutton.png'
import Editbutton from '../assets/Editbutton.png'

// import ReactStars from "react-rating-stars-component";

import 'ldrs/dotPulse'



export default function Profile() {
  const [user, setUser] = useState([]);
  const [datas, setDatas] = useState([]);
  const [reviewsId, setReviewsId] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('white');


  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
 
  const name = localStorage.getItem('name');
  const user_profile_img = 'https://picsum.photos/200/300';

  useEffect(() => {
    const getAllUsers = async () => {
      let docRef; // Declare docRef variable here
    
      const collectionReferece = collection(db, 'user'); // Reference to the 'user' collection
      try {
        docRef = await addDoc(collectionReferece, {
          user_name: name,
        });
        // console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    
      // Check if docRef is defined before using it
      if (docRef) {
        try {
          const docSnap = await getDoc(doc(db, 'user', docRef.id)); // Reference to the newly created document
          console.log(docSnap.id, '=>', docSnap.data());
          setUser(docSnap.data());
        } catch (error) {
          console.error('Error getting document: ', error);
        }
      }
    };
    
    

    getAllUsers();
  }, []);

  

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'data'), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('All data:', data);
    setDatas(data);
  });

  return () => unsubscribe();
  },[]);

  
  const handleClickDelete = async (id) => {
    console.log('reviewsId:', id);
    if (id) {
      console.log('code working');
      await deleteDoc(doc(db, 'data', id));
      setDatas((prevData) => prevData.filter((item) => item.id !==id));
    } else {
      console.log('code not working');
    }
  
  }


  const handleClickEdit =  (id) => {
    console.log('hello');    
  };


   const handleButtonClick = () => {
    
    setShowForm(true);

    setBackgroundColor('rgba(0, 0, 0, 0.763)');
    
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setBackgroundColor('white');
  };


  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  
 

  return (
    <div style={{ width: '99vw', padding: 30, height: '90vh', overflowY: 'scroll' }}>
        <h2 className='text-md-center'>My Review</h2> <p className='text-md-center'>Your total reviews {datas.length}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {
        datas.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: 50, fontWeight:"bold", width:'100vw' }}>
            <h4>Please Add Your Review</h4>
            <l-dot-pulse style={{marginTop:50}}   size="90" speed="1.3" color="black"  ></l-dot-pulse>
          </div>
        ) :(
         datas.map((d, index) => {
          return(
            
               <Card className='user-page' style={{ width: '30rem', height: 'auto', display: 'flex', margin: 20, padding: 10, cursor: 'pointer', overflow:'hidden' }}key={index}>
               <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ width: '20rem', padding: 5 }}>
              <div style={{ borderBottom: 'gray 2px solid', display: 'flex', alignItems: 'center' }}>
                <Card.Img style={{ height: 30, width: 30, borderRadius: '50%' }} src={user_profile_img} />
                <Card.Title className='d-inline-block fw-bold ' style={{ fontSize: 20, marginLeft: 25 }}>
                  {name}
                </Card.Title>
              </div>
              
              <Card.Text style={{ marginTop: 10 }}>User In Numbers Rating: {d.ratings}</Card.Text>
              
              <div>
              <Card.Text>
                {d.review_texts.length > 10 ? (
                  <div style={{display:'flex',alignItems:'center'}}>
                    <ReadMoreButton style={{width:40 , overflow:''}}  text={d.review_texts} maxLength={20} />
                    <div style={{display:"flex", alignItems:'center', marginTop: 40}}>
                     <Button onClick={()=>handleClickEdit(d.id)} style={{marginLeft:10}} className='two-bt'>
                      <img height={30} src={Editbutton} alt="" />
                     </Button>
                     <Button  onClick={()=>handleClickDelete(d.id)} className='two-bt'>
                      <img height={30} src={Deletebutton}  alt="" />
                     </Button>
                    </div> 
                  </div>
                ) : (
                  <div style={{display:'flex',alignItems:'center'}}>
                    <ReadMoreButton style={{width:40}} text={d.review_texts} maxLength={50} />
                  <div style={{display:"flex", alignItems:'center', marginTop: 10}}>
                     <Button onClick={()=>handleClickDelete(d.id)}  style={{marginTop:16}} className='two-bt'>
                      <img height={30} src={Deletebutton}alt="" />
                     </Button>
                    </div>
                  </div>
                )}
              </Card.Text>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <Card.Img width={200} height={100} src={d.movie_data.movie_img} />
            </div>
          </div>
        </Card>
          ) 
      })   
      )}
      </div>
</div>
  );
}