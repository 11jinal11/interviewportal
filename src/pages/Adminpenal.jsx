import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Formik, Form, Field } from 'formik';
import { TextField, Typography, Card } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Adminpenal = () => {
  const [ini, setIni] = useState({
    
    email: '',
    password: '',
  });
  const history = useHistory();

  const handleSubmit = (values) => {
    console.log(values);
    axios.post('https://interviewback-ucb4.onrender.com/admin/login', values)
      .then(() => {
        history.push('/dashboard');
        console.log('success');
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh', // full viewport height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5', // optional soft background
        }}
      >
        <Card
          sx={{
            minHeight: '300px',
            width: { lg: 380, md: 380, sm: 380, xs: 280 },
            border: '3px solid #0288d1',
            borderRadius: '25px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)' // optional depth
          }}
        >
          <Box
            sx={{
              padding: { lg: '25px', md: '20px', sm: '10px', xs: '10px' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography variant="h4" sx={{ color: '#0288d1', fontWeight: '700' }}>
              Admin Panel
            </Typography>
            <br />
            <Formik enableReinitialize initialValues={ini} onSubmit={handleSubmit}>
              <Form>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Field
                    as={TextField}
                    sx={{ width: { lg: 330, md: 330, sm: 330, xs: 200 } }}
                    name='email'
                    placeholder='Email'
                  />
                  <br />
                  <Field
                    as={TextField}
                    type="password"
                    sx={{ width: { lg: 330, md: 330, sm: 330, xs: 200 } }}
                    name='password'
                    placeholder='Password'
                  />
                  <br />
                  <Button
                    type='submit'
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)',
                      color: "white",
                      width: { lg: 330, md: 330, sm: 330, xs: 200 },
                      fontWeight: '600'
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            </Formik>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Adminpenal;
