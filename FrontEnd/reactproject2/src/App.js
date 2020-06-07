import React,{useEffect} from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import axios from 'axios'
import Messanger from './image/messenger.jpg'
import Gmail from './image/gmail.jpg'
import Hike from './image/hike.png'
import Insta from './image/insta.jpg'
import Macd from './image/macd.jpg'
import FB from './image/fb.png'
import Netflix from './image/netflix.png'
import Pinterest from './image/pinterest.png'
import Snap from './image/snap.jpg'
import Spotify from './image/spotify.png'
import Tiktok from './image/tiktok.jpg'
import Twitter from './image/twitter.png'
import  WA  from "./image/whatssup.png";
import Youtube from './image/youtube.jpg'


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 100,
    width: "50%",
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  Button: {
    marginLeft: 20,
    height: 30,
    padding: 5,
  },
  grid: {
    height: "100vh",
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [comment,setComment]=React.useState()
  const [Result,setResult]=React.useState('Not Found')
  const [searchApp,setSearch]=React.useState()
  const [analyseComment,setanalyseComment]=React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const setApp = (event) => {
    console.log("change called");
    setSearch(event.target.value)
  };
  const handlecomment = (event)=>{
    setComment(event.target.value)
    
  }
  console.log("comment",comment)

  const [open, setOpen, name] = React.useState(false);

  const handleClickOpen = () => {
    console.log("submit k time", searchApp);
    axios.post('http://localhost:3010/upload', { data: searchApp })
       .then((res) => {
         console.log("api ka response", res.data)
         setResult( res.data)
         if (res.data) { setResult( res.data)
           console.log("hai",res.data)
         }
         if (!res.data) { setResult('Not found')
         
        }

       })
       .catch((e) => {
         console.log(e)
       })

    setOpen(true);
  };

  const handleAnalyse =  () => {
        axios.post('http://localhost:3010/comment',{data:comment})
        .then((res) => {
          console.log("api ka response", res.data)
          Result = res.data
          if (res.data) {
            Result = res.data
            setanalyseComment(res.data)
          //  alert( res.data)
          }
    
        })
        .catch((e) => {
          console.log(e)
        })
    
    
       
    }
    
    useEffect(() => {
	console.log("use effect",searchApp,Result)
		
    },[searchApp,Result]);
  
  const handleClose = () => {
    setOpen(false);
  };
  // const ()=>handleAnalyse() = () => {
  //  console.log("analyse")};
  
  const handleDownload = () => {
    window.open("https://play.google.com/store?hl=en");
    console.log("download");
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Fraud App Detection
          </Typography>
          <div className={classes.search}>
            <SearchIcon />

            <TextField onChange={setApp} />
          </div>
          <Button
            className={classes.Button}
            variant="contained"
            color="white"
            onClick={handleClickOpen}
          >
            search
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Fraud App Detection "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The App You Searched is  {Result}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDownload} color="primary">
            Still Download?
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container>
        <Grid item xs={7} container>
          <Grid item xs={3}>
            <Paper
              style={{ padding: 20, height: 120, width: 120, margin: 20 }}
              elevation={20}
            >
              Pinterest
              { <img onClick={handleDownload}  style={{height:100,width:100}} src={Pinterest} /> }
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper
              style={{ padding: 20, height: 120, width: 120, margin: 20 }}
              elevation={20}
            >
              Netflix
              {<img onClick={handleDownload}  style={{height:100,width:100}} src={Netflix} /> }
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper
              style={{ padding: 20, height: 120, width: 120, margin: 20 }}
              elevation={20}
            >
              Facebook
              { <img onClick={handleDownload}  style={{height:100,width:100}} src={FB} /> }
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper
              style={{ padding: 20, height: 120, width: 120, margin: 20 }}
              elevation={20}
            >
              Instagram
              {<img onClick={handleDownload}  style={{height:100,width:100}} src={Insta} /> }
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper
              style={{ padding: 20, height: 120, width: 120, margin: 20 }}
              elevation={20}
            >
              Hike
              { <img onClick={handleDownload}  style={{height:100,width:100}} src={Hike} /> }
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper
              style={{ padding: 20, height: 120, width: 120, margin: 20 }}
              elevation={20}
            >
              WhatsApp
              {<img onClick={handleDownload}  style={{height:100,width:100}} src={WA} /> }
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper
              style={{ padding: 20, height: 120, width: 120, margin: 20 }}
              elevation={20}
            >
              Gmail
              {<img onClick={handleDownload}  style={{height:100,width:100}} src={Gmail} /> }
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              style={{ padding: 20, height: 120, width: 120, margin: 20 }}
              elevation={20}
            >
              TikTok
              {<img onClick={handleDownload}  style={{height:100,width:100}} src={Tiktok} />}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              style={{ padding: 20, height: 120, width: 120, margin: 20 }}
              elevation={20}
            >
              Spotify
              {<img onClick={handleDownload}  style={{height:100,width:100}} src={Spotify} />}
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper
              style={{ padding: 20, height: 120, width: 120, margin: 20 }}
              elevation={20}
            >
              Snapchat
              {<img onClick={handleDownload}  style={{height:100,width:100}} src={Snap} />}
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={5} container>
          <Grid item>
            <Typography variant="h4" style={{ margin: 8 }}>
              Want to analyse your comment??
            </Typography>
            <TextField
              label="Comment"
              multiline
              rows="4"
              fullWidth
              // value={comment}
              onChange={handlecomment}
             placeholder="Add the comment you want to analyse"
              variant="outlined"
              style={{ margin: 20 }}
            />
            <Button  style={{ margin: 20 }} onClick={()=>handleAnalyse()} variant="contained" color="primary">
             Analyse
            </Button>

            {analyseComment&&<div style={{ margin: 20 }}>{analyseComment}</div>}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
