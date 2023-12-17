import * as React from 'react'
import UseFetch from '../hooks/UseFetch';
import '../sass/login.scss';
import { useFormik } from 'formik';
import { TextField, FormControl, InputLabel, IconButton, InputAdornment, FilledInput, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [emailError, setEmailError] = React.useState('');
    const [passError, setPassError] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            const validEmailCheck = emailRegex.test(values.email);
            if (validEmailCheck === true && values.password.length >= 8) {
                console.log('submited');
                setEmailError('');
                setPassError('');
                UseFetch('/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values)
                }).then((res) => {
                    localStorage.removeItem('token');
                    return res.json();
                }).then((data) => {
                    console.log(data?.credintials[0]?.token);
                    localStorage.setItem('token',data?.credintials[0]?.token);
                    const token = localStorage.getItem('token');
                    token ? navigate('/') : ''
                }).catch(err => console.log(err));
            }else if(values.password.length < 8){
                setPassError('Password must be at least 8 characters');
            }else if(validEmailCheck === false){
                setEmailError('Please enter a valid email address');
            }else{
                setEmailError('Please enter a valid email address');
                setPassError('Password must be at least 8 characters');
            }
        }
    });
    return (
        <div className='container-login'>
            <div className="img">
                <img src="https://cdn.pixabay.com/photo/2020/10/07/10/51/mountains-5634817_1280.jpg" alt="" />
            </div>
            <div className='form-container'>
                <form id='form' onSubmit={formik.handleSubmit}>
                    <TextField
                        sx={{ width: '100%', my: '10px' }}
                        label='Email'
                        value={formik.values.email}
                        size='normal'
                        name='email'
                        variant="filled"
                        onChange={formik.handleChange}
                    />
                    <p>{emailError}</p>
                    <FormControl sx={{ width: '100%', my: '10px' }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                        <FilledInput
                            name='password'
                            onChange={formik.handleChange}
                            defaultValue={formik.values.password}
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <p>{passError}</p>
                    <Button sx={{ width: '200px', margin: 'auto', my: '10px', px: '20px', py: '10px' }} type='submit' variant='contained'>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
