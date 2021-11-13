import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import React,{useState,useContext} from 'react'
import {AuthContext} from '../context/AuthProvider.js'
import {useNavigate} from 'react-router-dom';



function Login() {
    const paperstyle = { padding : '20px',height:'70vh' , width:280 , margin:' 3rem auto' }
    const avtarstyel = {backgroundColor:"lightgreen"}
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading ,setLoading] = useState(false);
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const handlesubmit = async()=>{
        try{
            setLoading(true);
            let res = await login(email,password);
            setLoading(false);
            navigate('/');
        }
        catch(err){
            alert('log in again');
            console.log(err);
        }
    }
    const handleSignOUt=()=>{
        navigate('/signup');
    }
    return (
        <div>
            <Grid>
                <Paper elevation={10} style={paperstyle}>
                    <Grid align="center">
                        <Avatar style={avtarstyel}><LockIcon/></Avatar>
                    <h2>Signin</h2>
                    </Grid>
                    <TextField label='email' placeholder='Enter username' value={email} onChange={(e)=>{setEmail(e.target.value)}}style = {{marginBottom:"1rem"}}fullWidth> </TextField>
                    <TextField label='password' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter password' fullWidth> </TextField>
                    <FormControlLabel
                        control={
                        <Checkbox name="checkedB"
                        color="primary"/>
                        }
                        label="Remember me"
                    />
                    <Button variant="contained" onClick={handlesubmit} style = {{marginBottom:"1rem"}}type='submit' color='primary' fullWidth>SignIn</Button>
                    {/* <Typography style={{marginBottom:".5rem"}}><Link href="" >Forget Password ?</Link></Typography> */}
                    <Typography> Do You have an account  <Link href="/signup" >SingUp ?</Link></Typography>
                </Paper>
            </Grid>
        </div>
    )
}

export default Login
