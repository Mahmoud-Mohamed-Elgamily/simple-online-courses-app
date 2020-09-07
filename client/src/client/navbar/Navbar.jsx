import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import InputIcon from '@material-ui/icons/Input';
import { Tooltip, Container } from '@material-ui/core';
import authProvider from 'services/authProvider';
import { useHistory, Link } from 'react-router-dom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import userProvider from 'services/userProvider'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
  rightLink:{
    marginTop:12,
    marginRight:12,
    textDecoration: 'none',
  },
  title: {
    display: 'none',
    color: '#fff',
    '&:hover': {
      cursor: 'pointer'
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    color: '#fff'
  }
}));

export default function Navbar({search,setSearch}) {
  const classes = useStyles();
  const history = useHistory()
 
  const logOut = () => {
    authProvider.logout(history)
  }

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar>
            <Link className={classes.link} to="/">
              <Typography className={classes.title} variant="h4" noWrap>
                Online-Courses
              </Typography>
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={search}
                onEnter
                onChange={(e)=>setSearch(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {!userProvider.isAuthenticated() ?
                <>
                  <Tooltip title="Sign In">
                    <Link to="/sign-in">
                      <IconButton
                        className={classes.button}
                        aria-label="Sign-In"
                      >
                        <VpnKeyIcon />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Sign Up">
                    <Link to="/sign-up">
                      <IconButton
                        className={classes.button}
                        aria-label="Sign-Up"
                      >
                        <AccountBalanceIcon />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </>
                :
                <>
                  <Link to="/myCourses" className={classes.rightLink}>
                    <Typography className={classes.button} aria-label="Sign-In" variant="h5">
                      My Courses
                    </Typography>
                  </Link>
                  <Link to="/" className={classes.rightLink}>
                    <Typography className={classes.button} aria-label="Sign-In" variant="h5">
                      Home
                    </Typography>
                  </Link>
                  <Tooltip title="Sign Out">
                    <IconButton
                      className={classes.button}
                      onClick={logOut}
                    >
                      <InputIcon />
                    </IconButton>
                  </Tooltip>
                </>}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
