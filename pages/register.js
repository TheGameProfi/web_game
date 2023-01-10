import React, { useState } from 'react'
import { Button, Grid, TextField, Alert} from '@mui/material'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export function Login(){

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

    return(
        <Grid containter alignItems='center' justifyContent='center' height='100vh'>
            <Grid item>
                {
                    pageState.error !== '' && <Alert severity='error' sx={{mb:1 }}>{simplifyError(pageState.error)}</Alert>
                }
                <TextField sx={{mb: 1}} onChange={handleFieldChange} value={authState.username} fullWidth label="Username" id='username' />
                <TextField sx={{mb: 1}} onChange={handleFieldChange} value={authState.password}  fullWidth label="Password" type='password' id='password' />
                <Button disabled={pageState.processing} sx={{ mb: 1}} onClick={handleAuth} fullWidth variant='contained'>Login</Button>
            </Grid>
        </Grid>
    )
}

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
    
    
    return(
        <div className="all">
      <Grid containter alignItems='center' justifyContent='center' height='100vh'>
      <div className="login-box">
            <h1>Account Erstellen</h1>
            <Grid item>
             {
                    pageState.error !== '' && <Alert severity='error' sx={{mb:1 }}>{simplifyError(pageState.error)}</Alert>
                }
                <div className="user-box">
                <input 
                    required="" 
                    type="text" 
                    minLength="4" 
                    maxLength="16" 
                    placeholder=" " name="username" 
                    autoComplete="off"
                    onInvalid="this.setCustomValidity('Benutzername mit min. 4 und max. 16 Zeichen eingeben')"
                    onInput="this.setCustomValidity('')"
                ></input>
                <label>Benutzername</label>
            </div>
            <div className="user-box">
                <input 
                    required="" 
                    type="email" 
                    placeholder=" " name="email" 
                    autoComplete="off"
                    onInvalid="this.setCustomValidity('Eine gültige E-Mail eingben')"
                    onOnput="this.setCustomValidity('')"
                ></input>
                <label> E-Mail</label>
            </div>
            <div className="user-box">
                <input 
                    required="" 
                    type="password" 
                    minLength="4" 
                    placeholder=" " name="password" 
                    autoComplete="off" 
                    onInvalid="this.setCustomValidity('Passwort mit mindestens 4 Zeichen eingeben')"
                    onInput="this.setCustomValidity('')"
                ></input>
                <label>Passwort</label>
            </div>
            <div className="button">
            <button name="submit" href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Erstellen
            </button>
            </div>
        </Grid>        
        </div>
        
        </Grid>
        
        </div>
      )
}