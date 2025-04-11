import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Switch from '@mui/material/Switch';
import { Formik, Form, Field } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InteviewPortal from "./InteviewPortal";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { FormControlLabel } from "@mui/material";
//button/-----
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Categary = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [ini,setIni]=useState({
    categoryName:''
  })


  const [list,setList]=useState([])
  const [editId,setEditId]=useState(null)
 
 const label = { inputProps: { 'aria-label': 'Size switch demo' } };
  const handleSubmit = (values,{resetForm}) => {
    console.log(values);
    
    if(editId!= null){
      
      axios.patch(`https://interviewback-ucb4.onrender.com/category/${editId}`,values,{
        headers:{
          Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjYyMDUwM30._S8-zRqSVebO8IljXmp3vSa-IOpV2_bp-USjSzuVFP8"
        }
      })
      .then(()=>{
        console.log('edit succes')
        dataView()
      })
      .catch((err)=>{
        console.log(err)
      })
      setIni({
        categoryName:''
      })
      handleClose()
    }
    else{

       axios.post('https://interviewback-ucb4.onrender.com/category/create',values,{
      headers:{
        Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjYyMDUwM30._S8-zRqSVebO8IljXmp3vSa-IOpV2_bp-USjSzuVFP8"
      }
    })
    .then(()=>{
      console.log('succes')
      dataView()
    })
    .catch((err)=>{
      console.log(err)
    })
    setIni({
      categoryName:''
    })
  }
    resetForm()
   handleClose()
  };



  function dataView(){
    axios.get('https://interviewback-ucb4.onrender.com/category/',{
      headers:{
        Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjYyMDUwM30._S8-zRqSVebO8IljXmp3vSa-IOpV2_bp-USjSzuVFP8"
      }
    })
    .then((res)=>{
      console.log(res.data.data);
      setList(res.data.data)
    })
    .catch((err)=>{
      console.log(err);
      })
  }

 

  const deleteData=(id)=>{
    axios.delete(`https://interviewback-ucb4.onrender.com/category/${id}`,{
      headers:{
        Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjYyMDUwM30._S8-zRqSVebO8IljXmp3vSa-IOpV2_bp-USjSzuVFP8"
      }
    })
    .then(()=>{
      console.log('delete succes');
      dataView()
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const editData = ( id,row) => {
    handleClickOpen()
        setIni(row);
       setEditId(id);
    
  };
  //--------------------sarch catagary start-------------------------------------------------
  const [serchcat,setSearchCat]=useState('')

const searchCategory = (e) => {
  const value = e.target.value;
  setSearchCat(value);

  axios.get(`https://interviewback-ucb4.onrender.com/category/?search=${value}`, {
    headers:{
      Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0Mjc5Njg3OX0.VhjRg_oGm9skgXMpeoVr5BzXF_1CYCdgaGYn8WCL_aM"
   }
  })
    .then((res) =>{
      setList(res.data.data)
    })
    
    .catch((err) => {
      console.error('Search error:', err)
});
};
//--------------------sarch catagary end-------------------------------------------------
 
// ------------------status start-----------------------------------------------------
const [checked, setChecked] = React.useState(true);


const allSubCatUpdate = (filteredSubcategories) => { //sub catagary data handle
  console.log("check");
  
  for (let i = 0; i < filteredSubcategories.length; i++) {
    const subcategorystatus = filteredSubcategories[i];
 console.log(subcategorystatus);
 
    axios
      .patch(`https://interviewback-ucb4.onrender.com/subcategory/${subcategorystatus._id}`, {
        status: subcategorystatus.status === 'on' ? 'off' : 'on',
      }, {
        headers:{
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0Mjc5Njg3OX0.VhjRg_oGm9skgXMpeoVr5BzXF_1CYCdgaGYn8WCL_aM"
       }
      })
      .then(() => {
        console.log(`Updated subcategory ${subcategorystatus._id}`);
      })
      .catch((err) => {
        console.error("Update error:", err);
      });
  }
};

const handleChange = (event) => {
  setChecked(event.target.checked);
}

  function sub (id){ // to get sub data
 axios.get('https://interviewback-ucb4.onrender.com/subcategory/',{
  headers:{
    Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjYyMDUwM30._S8-zRqSVebO8IljXmp3vSa-IOpV2_bp-USjSzuVFP8"
  }
})
.then((item) => {
  console.log("get data success");
  const filteredSubcategories = item.data.data.filter((item) => item.categoryID?._id === id);
  // console.log("Filtered Subcategories:", item.data.data);
  allSubCatUpdate(filteredSubcategories) // sub catagary mli gay => data patch kravana
})
.catch((err)=>{~
  console.log(err);
  })
  }
  const handleswitch = (e,id,item) => {
    console.log(e.target.checked);
    
    axios.patch(`https://interviewback-ucb4.onrender.com/category/${id}` , {
      'status' : e.target.checked ? 'on' : 'off'
    } , {
      headers:{
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0Mjc5Njg3OX0.VhjRg_oGm9skgXMpeoVr5BzXF_1CYCdgaGYn8WCL_aM"
     }
    })
    .then(() => {
      dataView()
      sub(id) ///to get subcatagry data
      console.log("status success");
      
    })
    .catch((error) => {
      console.log(error);
    })
    
  }
//----------------status button  end----------------------------------------------------------------//
  useEffect(()=>{
    dataView()
  },[])
  return (
    <>
      <InteviewPortal>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: { lg: "no-wrap", md: "wrap", sm: "wrap", xs: "wrap" },
          }}
        >
          <Box
            component="form"
            sx={{ width: { lg: "80% ", md: "100%", sm: "100%", xs: "100%" } }}
            noValidate
            autoComplete="off"
          >
            <div>
            <TextField
        // select  
        value={serchcat}
            label="Search Category"
            sx={{ width: "100%" }}
            onChange={searchCategory}
          >
            {list.map((option) => (
              <MenuItem key={option._id} value={option.categoryName}>
                {option.categoryName}
              </MenuItem>
            ))}
          </TextField>
            </div>
          </Box>
          {/* button add catagary------------------------------------------------ */}
          <Box
            sx={{
              width: { lg: "20% ", md: "100%", sm: "100%", xs: "100%" },
              justifyContent: "center",
              display: "flex",
              padding: "10px 0px",
            }}
          >
            <React.Fragment>
              <Button
                sx={{ background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)', color: "white", width: "90%", height: '50px' }} 

                

                variant="outlined"
                onClick={handleClickOpen}
              >
                ADD CATAGARY
              </Button>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogTitle sx={{background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)', color: "white", m: 0, p: 2 }} id="customized-dialog-title">
                  Add Catagary
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={(theme) => ({
                    position: "absolute",
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
                  <Form>
                    <DialogContent dividers>
                      <Field as={TextField} name="categoryName" label="catagary"></Field>

                      <DialogActions>
                        <Button
                        
                          sx={{background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)', color: "white" }}
                          autoFocus
                          type="submit"
                        >
                          Submit
                        </Button>
                      </DialogActions>
                    </DialogContent>
                  </Form>
                </Formik>
              </BootstrapDialog>
            </React.Fragment>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead sx={{background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)'}}>
              <TableRow>
                <StyledTableCell>No.</StyledTableCell>
                <StyledTableCell align="center">Catagary Name</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
               
                <StyledTableCell align="center">Delete</StyledTableCell>
                <StyledTableCell align="center">Update</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row,i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {i+1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.categoryName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  <FormControlLabel control={<Switch checked={row.status === 'on'} />} onChange={(e) => handleswitch(e , row._id,row)} />
                  </StyledTableCell>
                
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
  );
};

export default Categary;


