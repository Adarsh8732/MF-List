import React,{useEffect,useState} from 'react'
import {database} from '../firebase'
import { useParams } from 'react-router'
import { CircularProgress,Typography } from '@mui/material';
import PrimarySearchAppBar from './Navbar';
import './profile.css'
function Profile() {
    const {id} = useParams();
    const [userData,setUserdata] = useState(null)

    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setUserdata(snap.data())
        })
    },[id]);

    return (
        userData==null ? <CircularProgress/> : 
            <>
                <PrimarySearchAppBar/>
                <div className="spacer"></div>
                
                <div className="container">
                    <div className="profile-img">
                            <img src={userData.profileUrl}/>
                    </div>

                    <div className="info">
                            <Typography className="one" variant="h5">
                                Name : {userData.name}
                            </Typography>
                            
                            <Typography className="one" variant="h5">
                                Email : {userData.email}
                            </Typography>
                            
                            <Typography className="one"variant="h5">
                                Date Of Birth : {userData.DOB}
                            </Typography>
                            
                            <Typography className="one" variant="h5">
                                Gender : {userData.gender=='male'||'Male'?"Male":"Female"}
                            </Typography>
                            {/* <Button onClick={()=>{}}>Edit</Button> */}
                    </div>
                </div>
            </>
    )
}

export default Profile
