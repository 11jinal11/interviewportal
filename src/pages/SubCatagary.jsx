
import React, { useEffect, useState } from 'react'
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
import Switch from '@mui/material/Switch';
import { Formik, Form, Field } from 'formik'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InteviewPortal from './InteviewPortal';
import axios from 'axios';
import { FormControl, FormControlLabel, InputLabel, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': { padding: theme.spacing(2) },
  '& .MuiDialogActions-root': { padding: theme.spacing(1) },
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
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
  '&:last-child td, &:last-child th': { border: 0 },
}));

const SubCatagary = () => {
  const [open, setOpen] = useState(false);
  const [catId, setcatId] = useState('');
  const [ini, setIni] = useState({ subCategoryname: '', categoryID: '' });
  const [checked, setChecked] = useState(true);
  const [list, setList] = useState([]);
  const [list1, setList1] = useState([]);
  const [editId, setEditId] = useState(null);
  const [serchsubcat, setserchSubcat] = useState('');

  const handleClickOpen = () => {
    if (!editId) {
      setIni({ subCategoryname: '', categoryID: '' });
    }
    setcatId('');
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = (values, { resetForm }) => {
    const url = editId
      ? `https://interviewback-ucb4.onrender.com/subcategory/${editId}`
      : 'https://interviewback-ucb4.onrender.com/subcategory/create';

    const method = editId ? axios.patch : axios.post;

    method(url, values, {
      headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0Mjc5Njg3OX0.VhjRg_oGm9skgXMpeoVr5BzXF_1CYCdgaGYn8WCL_aM"
      }
    })
      .then(() => {
        dataView();
        resetForm();
        setEditId(null);
        handleClose();
      })
      .catch(console.log);
  };

  const dataView = () => {
    axios
      .get('https://interviewback-ucb4.onrender.com/subcategory/', {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0Mjc5Njg3OX0.VhjRg_oGm9skgXMpeoVr5BzXF_1CYCdgaGYn8WCL_aM"
        }
      })
      .then((res) => setList1(res.data.data))
      .catch(console.log);
  };

  const handleFillcatagary = () => {
    axios.get('https://interviewback-ucb4.onrender.com/category/', {
      headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjYyMDUwM30._S8-zRqSVebO8IljXmp3vSa-IOpV2_bp-USjSzuVFP8"
      }
    })
      .then((res) => setList(res.data.data))
      .catch(console.log);
  };

  const deleteData = (id) => {
    axios.delete(`https://interviewback-ucb4.onrender.com/subcategory/${id}`, {
      headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0Mjg4MTY0OH0.c3cdoNzxbcAwcYhwJL5iTEFVPXOXBY9wA0-kUWjbwo0"
      }
    })
      .then(dataView)
      .catch(console.log);
  };

  const editData = (id, row) => {
    handleClickOpen();
    setEditId(id);
    setIni({
      subCategoryname: row.subCategoryname,
      categoryID: row.categoryID?._id || "",
    });
  };

  const serchSubcatagary = (e) => {
    const value = e.target.value;
    setserchSubcat(value);

    axios.get(`https://interviewback-ucb4.onrender.com/subcategory/?search=${value}`, {
      headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0Mjc5Njg3OX0.VhjRg_oGm9skgXMpeoVr5BzXF_1CYCdgaGYn8WCL_aM"
      }
    })
      .then((res) => setList1(res.data.data))
      .catch(console.log);
  };

  const handleSwith = (e, id) => {
    axios.patch(`https://interviewback-ucb4.onrender.com/subcategory/${id}`, {
      status: e.target.checked ? 'on' : 'off'
    }, {
      headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0Mjc5Njg3OX0.VhjRg_oGm9skgXMpeoVr5BzXF_1CYCdgaGYn8WCL_aM"
      }
    })
      .then(dataView)
      .catch(console.log);
  };

  useEffect(() => {
    dataView();
    handleFillcatagary();
  }, []);

  return (
    <InteviewPortal>
      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        <Box component="form" sx={{ width: { lg: '80%', xs: '100%' } }} noValidate autoComplete="off">
          <TextField
            label="Search SubCatagary"
            sx={{ width: "100%" }}
            onChange={serchSubcatagary}
            value={serchsubcat}
            select
          >
            {list1.map((option) => (
              <MenuItem key={option._id} value={option.subCategoryname}>
                {option.subCategoryname}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ width: { lg: '20%', xs: '100%' }, display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
          <Button  sx={{ background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)', color: "white", width: "90%", height: '50px' }} variant="outlined" onClick={handleClickOpen}>
            ADD SUB-CATAGARY
          </Button>
        </Box>

        <BootstrapDialog onClose={handleClose} open={open}>
          <DialogTitle sx={{ background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)', color: "white"}}>
            Add SubCatagary
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <Formik enableReinitialize initialValues={ini} onSubmit={handleSubmit}>
            {({ setFieldValue, values }) => (
              <Form>
                <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Field as={TextField} name="subCategoryname" label="subcategory" />
                  <FormControl fullWidth>
                    <InputLabel>category</InputLabel>
                    <Select
                      name="categoryID"
                      label="category"
                      onChange={(e) => setFieldValue("categoryID", e.target.value)}
                      value={values.categoryID}
                    >
                      {list.map((row) => (
                        <MenuItem key={row._id} value={row._id}>
                          {row.categoryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button type="submit" sx={{ background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)', color: "white" }}>Submit</Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </BootstrapDialog>
      </Box>

      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)'}}>
            <TableRow>
              <StyledTableCell>No.</StyledTableCell>
              <StyledTableCell align="center">Sub-Catagary Name</StyledTableCell>
              <StyledTableCell align="center">Catagary Name</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>  
              <StyledTableCell align="center">Delete</StyledTableCell>
              <StyledTableCell align="center">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list1.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell align="center">{row.subCategoryname}</StyledTableCell>
                <StyledTableCell align="center">{row.categoryID?.categoryName}</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControlLabel control={<Switch checked={row.status === 'on'} onChange={(e) => handleSwith(e, row._id)} />} />
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
  )
}

export default SubCatagary
