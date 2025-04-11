import React, { useState,useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { Formik, Form ,Field} from 'formik'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import InteviewPortal from './InteviewPortal';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FormControl, InputLabel, Select } from '@mui/material';
//button/-----
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: 'linear-gradient(135deg, #4fc3f7 0%,100%)',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const Tokan="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MzA1NTQyMn0.aZYxyCRQ1STR-TFhknYeX8hpE5jBi2jFSqTnt5RLXHU"

const QandA = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
  if(!editId){
    setIni({
      questions:'',
      answer:'',
      subcategoryID:''
    })
    setOpen(true);
  }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [ini,setIni]=useState({
    questions:'',
    answer:'',
    subcategoryID:''
  })
  const [list,setList]=useState([])
 const [list1,setList1]=useState([])
  const [list2,setList2]=useState([])
  const [editId,setEditId]=useState(null)

  const handleSubmit=(values,{resetForm})=>{
    console.log("-=-=-=-=-",values);
    if(editId != null){
      axios.patch(`https://interviewback-ucb4.onrender.com/questions/${editId}`,values,{
        headers:{
          Authorization:Tokan
        }
      })
      .then(()=>{
        console.log('update succes');
        dataView()
        setEditId(null);
        
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    else{
   console.log("check ------");
   
    axios.post('https://interviewback-ucb4.onrender.com/questions/create',values,{
      headers:{
        Authorization:Tokan
      }
    })
    .then(()=>{
      console.log('data enter succes');
      dataView()
      resetForm()
    })
    .catch((error)=>{
      console.log(error);
    })
   
    handleClose();
  }
}
  function dataView(){
    axios.get('https://interviewback-ucb4.onrender.com/questions/',{
      headers:{
        Authorization:Tokan
      }
    })
    .then((res)=>{
      console.log("====",res.data.data)
      setList2(res.data.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
const handleFillsubcatagary=()=>{
  axios
  .get('https://interviewback-ucb4.onrender.com/subcategory/', {
    headers: {
      Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0Mjc5Njg3OX0.VhjRg_oGm9skgXMpeoVr5BzXF_1CYCdgaGYn8WCL_aM"
    }
  })
  .then((res) => {
    console.log(res.data.data)
    setList1(res.data.data)

  })
  .catch((error) => {
    console.log(error)
  })
}

const deleteData=(id)=>{
  axios.delete(`https://interviewback-ucb4.onrender.com/questions/${id}`,{
    headers:{
      Authorization:Tokan
    }
  })
  .then(()=>{
    console.log('succes');
    dataView()
  })
  .catch((err)=>{
    console.log(err);
  })
}

const editData=(id,row)=>{
  handleClickOpen()
  setEditId(id)
  setIni({
    questions:row.questions,
    answer:row.answer,
    subcategoryID:row.subcategoryID?._id,
    categoryID: row.categoryID?._id
  })
}
  useEffect(()=>{
    dataView()
    handleFillsubcatagary()
  },[])
  const handleChange = (e) => {
    console.log(e.target.values);
    
    setIni((prev) => ({
      ...prev,
  
      subcategoryID: e.target.value,
     
    }));
  };

  
  return (
    <>
      <InteviewPortal>
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Box
            component="form"
            sx={{ width: '80%' }}

            noValidate
            autoComplete="off"

          >
         

          </Box>
          {/* button add catagary------------------------------------------------ */}
          <Box sx={{ width: { lg: '20% ', md: '100%', sm: '100%', xs: '100%' }, justifyContent: 'center', display: 'flex', padding: '0px 35px 0px 35px' }}>
            <React.Fragment>
              <Button sx={{ background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)', color: "white", width: { lg: '100%', md: '100%', sm: '100%', xs: '100%' } }} variant="outlined" onClick={handleClickOpen}>
                ADD Q & A
              </Button>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogTitle sx= {{background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)', color: "white", m: 0, p: 2 }} id="customized-dialog-title">
                  Add Question & Answer
                </DialogTitle>
                <IconButton

                  aria-label="close"
                  onClick={handleClose}
                  sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                  })}
                >
                  <CloseIcon />
                </IconButton>
                <Formik
                enableReinitialize
                initialValues={ini}
                onSubmit={handleSubmit}
                >
                  {({setFieldValue,values})=>(

                 
                  <Form>
                    <DialogContent dividers>

                    <Field as={TextField} name='questions' label='Questions' fullWidth margin='dense' />
                    <Field as={TextField} name='answer' label='Answer' fullWidth margin='dense' />
                      <FormControl fullWidth margin='dense'>
                        <InputLabel id="demo-simple-select-label">sub category name</InputLabel>
                      
                        <Select
                          name="subcategoryID"
                          label="subcategoryname"
                          // onChange={handleChange} 
                          value={values.subcategoryID} 
                          onChange={(e) => setFieldValue("subcategoryID", e.target.value)}
                        >
                          {
                            list1.map((row) => (
                              <MenuItem value={row._id}>{row.subCategoryname}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                      <DialogActions>
                        <Button sx={{ background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)', color: "white" }} autoFocus 
                        type='submit'
                        onClick={handleClose}>
                          Submit
                        </Button>
                      </DialogActions>
                    </DialogContent>
                  </Form>
                   )}
                </Formik>



              </BootstrapDialog>
            </React.Fragment>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: { xs: 200 }, mt: '10px' }} aria-label="customized table">
          <TableHead sx={{background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)'}}>

              <TableRow >
                <StyledTableCell >No.</StyledTableCell>
                <StyledTableCell align="leftr">Question</StyledTableCell>
                <StyledTableCell align="left">Answer</StyledTableCell>
                <StyledTableCell align="center">Sub-Catagary Name</StyledTableCell>
                <StyledTableCell align="center">Catagary Name</StyledTableCell>

                <StyledTableCell align="center">Delete</StyledTableCell>
                <StyledTableCell align="center">Update</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list2.map((row,i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {i+1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.questions}</StyledTableCell>
                  <StyledTableCell align="left">{row.answer}</StyledTableCell>
                  <StyledTableCell align="center">{row.subcategoryID?.subCategoryname}</StyledTableCell>
                  <StyledTableCell align="center">{row.subcategoryID?.categoryID.categoryName}</StyledTableCell>

                  <StyledTableCell align="center">
                  <Button variant="contained" color="error" onClick={() => deleteData(row._id)} sx={{ minWidth: '30px', padding: '5px' }}>
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => editData(row._id, row)}
                    sx={{
                      backgroundColor: 'green',
                      minWidth: '30px',
                      padding: '5px',
                      '&:hover': { backgroundColor: 'darkgreen' },
                    }}
                  >
                    <EditIcon />
                  </Button>
                </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </InteviewPortal>
    </>
  )
}

export default QandA