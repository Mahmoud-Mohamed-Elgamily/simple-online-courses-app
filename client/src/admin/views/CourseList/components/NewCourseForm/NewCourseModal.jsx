import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axiosInstance from 'services/serverHandler'
import { useHistory } from 'react-router-dom';
import { Input, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: 100 + "%",
    marginBottom: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NewCourseModal({ course, setCourse, categories, courses, setCourses, open, handleClose }) {

  const history = useHistory()
  const classes = useStyles();
  const [newCourse, setNewCourse] = useState(course ?? {})


  const handleCourseCreation = () => {
    let formData = new FormData();
    Object.entries(newCourse).forEach(entry => {
      if (!(entry[0] == 'id' || entry[0] == 'createdAt' || entry[0] == "updatedAt"))
        formData.append(entry[0], entry[1])
    })
    
    axiosInstance(history).post('/courses/addCourse', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(createdNewCourse => {
      console.log(createdNewCourse);
      setCourses([
        createdNewCourse.data,
        ...courses
      ])
      setNewCourse({})
      handleClose()
    }).catch(error => {
      console.log(error)
    })
  }

  const handleCourseUpdate = () => {
    let formData = new FormData();
    Object.entries(newCourse).forEach(entry => {
      if (!(entry[0] == 'id' || entry[0] == 'createdAt' || entry[0] == "updatedAt"))
        formData.append(entry[0], entry[1])
    })

    axiosInstance(history).put(`/courses/${course.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(updatedCourse => {
      setCourse(newCourse)
      setNewCourse({})
      handleClose()
    }).catch(error => {
      console.log(error)
    })
  }

  const handleChange = event => {
    event.persist()
    setNewCourse(newCourse => ({
      ...newCourse,
      [event.target.name]: event.target.name == 'image' ? event.target.files[0] : event.target.value
    }));
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill this form to create new course
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Course Name"
            type="text"
            name="name"
            value={newCourse.name || ''}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Course Description"
            type="text"
            name="description"
            value={newCourse.description || ''}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Points"
            name="points"
            onChange={handleChange}
            type="number"
            value={newCourse.points || ''}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newCourse.categories || []}
              multiple
              name="categories"
              onChange={handleChange}
            >
              {categories.map(category => {
                return <MenuItem value={category.id}>{category.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          <Input
            label="Course Image"
            type="file"
            margin="dense"
            name="image"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {course ?
            <Button onClick={handleCourseUpdate} color="primary">
              Update
            </Button>
            :
            <Button onClick={handleCourseCreation} color="primary">
              Create
              </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
