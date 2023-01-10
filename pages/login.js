import React, { useState } from 'react'
import { Button, Grid, TextField, Alert} from '@mui/material'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'


export default function Newlogin(){
  const router = useRouter()

    const [authState, setAuthState] = useState({
        username: '',
        password: ''
    })

    const [pageState, setPageState] = useState({
        error:'',
        processing: false
    })

    const handleFieldChange = (e) => {
        setAuthState(old => ({ ...old, [e.target.id]: e.target.value}))
    }

    const simplifyError = (error) => {
        const errorMap = {
            "CredentialsSignin": "Invalid username or password"
        }
        return errorMap[error] ?? 'Unknown error occurred'
    }

    const handleAuth = async () => {
        setPageState(old => ({...old, processing: true, errir: ''}))
        signIn('credentials', {
            ...authState,
            redirect: false
        }).then(response => {
            console.log(response)
            if(response.ok){
                //
                router.push("/")
            }else {
                setPageState(old=> ({...old, processing: false, error: response.error }))
            }
        }).catch(error => {
            console.log(error)
            setPageState(old=> ({...old, processing: false, error: error.message ?? "Something went wrong!" }))
        })
    }
    
    var status = 0;

    function statu(){
        status = 1
    }

    return(
        <div className="all">
      <Grid containter alignItems='center' justifyContent='center' height='100vh'>
      <div className="login-box">
            <h1>Einloggen</h1>
            <Grid item>
             {
                    pageState.error !== '' && <Alert severity='error' sx={{mb:1 }}>{simplifyError(pageState.error)}</Alert>
                }
                <div className="user-box">
                <TextField 
                    sx={{mb: 1}} 
                    InputProps={{className: 'textfield_input'}} 
                    InputLabelProps={{className: 'textfield_label'}} 
                    onChange={handleFieldChange} value={authState.username} 
                    fullWidth 
                    label="Benutzername" id='username'
                    inputProps={{ maxLength: 12 }}   
                    variant="standard"/>
            </div>
            <div className="user-box">
            <TextField 
                sx={{mb: 1}}
                InputProps={{className: 'textfield_input'}} 
                InputLabelProps={{className: 'textfield_label'}} 
                onChange={handleFieldChange} value={authState.password}  
                fullWidth 
                label="Password" type='password' id='password' 
                variant="standard" />
            </div>
            <div className="button">
            <button name="submit" disabled={pageState.processing} sx={{ mb: 1}} onClick={handleAuth}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Login
            </button>
            
        
            </div>
        </Grid>        
        </div>
        
        </Grid>
        </div>
      )
}