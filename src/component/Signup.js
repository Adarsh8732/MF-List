import React,{useContext, useState} from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { AuthContext } from '../context/AuthProvider';
import { storage,firestore,database } from '../firebase';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router';
const Signup = () => {    
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[gender,setGender] = useState("");
    const[error,setError] = useState(false);
    const[loading,setLoading] = useState(false);
    const[file,setFile] = useState(null);
    const[dob,setDOB] = useState("");
    let{signup} = useContext(AuthContext);
    const history = useNavigate();
    
    function handlFileSubmit(e){
        let file=e?.target?.files[0];
        // console.log(file);
        if(file!=null){
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
        }
    }

    async function handleSignup(e){
        e.preventDefault();
        if(file==null){
            setError("Please upload profile image first");
            setTimeout(()=>{
                setError('')
            },2000)
            return;
        }
        try{
            setError('');
            setLoading(true);
            let res = await signup(email,password);
            let uid  = res.user.uid;
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
            uploadTaskListener.on('state_changed',fn1,fn2,fn3);
             // fn1 -> progress
            // fn2 -> error 
            // fn3-> success
            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} done.`)
            }

            function fn2(error) {
                setError(error);
                setTimeout(()=>{
                    setError('')
                },2000);
                setLoading(false)
                return;
            }

            async function fn3() {
                // link get 
                uploadTaskListener.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url);

               database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    name:name,
                    passowrd:password,
                    gender:gender,
                    DOB:dob,
                    profileUrl:url,
                    createdAt: database.getUserTimeStamp(),
                })
                })
                setLoading(false);
                history("/")
            }

        }
    catch(err){
        setError(err);
        setTimeout(()=>{
            setError('')
        },2000)
        }
    }
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form>
                    {error!='' && <Alert severity="error">{error}</Alert>}
                    <TextField fullWidth label='Name' value ={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter your name" />
                    <TextField fullWidth label='Email' value = {email} onChange = {(e)=>{setEmail(e.target.value)}} placeholder="Enter your email" />
                    {/* <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl> */}
                    
                    <TextField fullWidth label='Gender' value = {gender} onChange = {(e)=>{setGender(e.target.value)}} />
                    <TextField fullWidth label='enter your DOB' value={dob} onChange={(e)=>{setDOB(e.target.value)}} placeholder="dd/mm/yyyy"/>
                    <TextField fullWidth style={{marginBottom:".5rem"}} label='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your password"/>
                    <Button color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<CloudUploadIcon />} component="label">
                    Upload Profile Image
                    <input type="file" accept="image/*" hidden onChange={(e)=>{handlFileSubmit(e)}}/>
                    </Button>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <Button type='submit' disabled={loading} variant='contained' onClick={handleSignup} color='primary'>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;