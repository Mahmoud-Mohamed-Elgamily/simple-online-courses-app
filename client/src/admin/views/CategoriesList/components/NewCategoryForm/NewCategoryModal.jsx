import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axiosInstance from 'services/serverHandler'
import { useHistory } from 'react-router-dom';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

export default function NewCategoryModal({ categories, setCategories, open, setOpen, handleClickOpen, handleClose, category, setCategory }) {

  const history = useHistory()
  const [categoryName, setCategoryName] = useState(category?.name || '')

  const handleCategoryCreation = () => {
    if (categoryName.length > 0)
      axiosInstance(history).post('/categories/addCategory', { name: categoryName })
        .then(createdCategory => {
          setCategories([
            createdCategory.data,
            ...categories
          ])
          setCategoryName('')
          handleClose()
        }).catch(error => {
          console.log(error)
        })
    else
      alert('cant add empty name')
  }

  const handleCategoryUpdate = () => {
    if (categoryName.length > 0)
      axiosInstance(history).put(`/categories/${category.id}`, { name: categoryName })
        .then(updates => {
          category.name = categoryName;
          setCategory(category)
          setCategoryName('')
          handleClose()
        }).catch(error => {
          console.log(error)
        })
    else
      alert('cant add empty name')
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill this form to create new user
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Category Name"
            type="text"
            name="name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {category ?
            <Button onClick={handleCategoryUpdate} color="primary">
              Update
            </Button>
            :
            <Button onClick={handleCategoryCreation} color="primary">
              Create
              </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );

}