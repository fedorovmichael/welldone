import React from 'react';
import { fade, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import SaveIcon from '@material-ui/icons/Save';
import { Link } from 'react-router-dom';
import store from './../store';
import * as actionFun from './../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuid from 'node-uuid';


const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
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
    width: theme.spacing(7),
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
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
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
  btnLink:{
    color: 'white'
  },
  btnLinkMobile:{
      display: 'flex',
      color: '#000',
  }
});

class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {anchorEl: null, mobileMoreAnchorEl: null, categoryName: ''}
    }   

   handleMobileMenuClose = () => {
    this.setState({mobileMoreAnchorEl: null}) 
  };

   handleMobileMenuOpen = event => {
    this.setState({mobileMoreAnchorEl: event.currentTarget})    
  };
  
  handelAddCategory = () => {
    store.dispatch(actionFun.setCurrentPage('new'));    
    this.props.history.push('/category-new');
  }
   
  handelSaveCategory = () => {
    let categoryid = uuid.v1();
    let clCategory = {id: categoryid, name: this.props.newCategoryName, listLocations: []};
    store.dispatch(actionFun.addCategory(clCategory));
    let liCat = this.props.listCategories;
    liCat.push(clCategory)
    let categoryJson = JSON.stringify(liCat)
    console.log("update categoryJson 1 ", categoryJson) 
    this.updateLocalStorage("categories" ,liCat);
    this.props.history.push('/');
  }

  handelHomeRedirect = () => {
    store.dispatch(actionFun.setCurrentPage('home'));
    this.props.history.push('/');
  }
  
  handlerRemoveCategory = (e) => {    
    let liCategories = this.props.listCategories.filter( c => c.id !== this.props.selectedCategory)
    store.dispatch(actionFun.setCategoryList(liCategories));
    this.updateLocalStorage("categories", liCategories);
  }

  handleEditCategory = () => {
    store.dispatch(actionFun.setCurrentPage('edit'));
    this.props.history.push('/category-edit');    
  }

  handleUpdateCategory = () => {
    const {listCategories, selectedCategory, newCategoryName} = this.props
    let cat = listCategories.filter(c => c.id === selectedCategory)[0]
    cat.name = newCategoryName    
    let liCat = listCategories.filter(c=>c.id !== selectedCategory)    
    liCat.push(cat)    
    store.dispatch(actionFun.setCategoryList(liCat));
    this.updateLocalStorage("categories", liCat);
    this.props.history.push('/');
  }

  updateLocalStorage(key, value){
    let valueJson = JSON.stringify(value)
    localStorage.removeItem(key)
    localStorage.setItem(key, valueJson)
  } 

  componentDidMount(){  
    let strCategories = localStorage.getItem("categories")
    console.log("update categoryJson 1 ", strCategories, strCategories !== 'undefined' , strCategories !== '')
    if(strCategories !== 'undefined' &&  strCategories !== null && strCategories !== undefined){
        console.log("update categoryJson 2 ", strCategories)
        let liCat = JSON.parse(strCategories)        
        store.dispatch(actionFun.setCategoryList(liCat));
    }    
  }  
     
render(){
  const {classes, currentPage, actionType} = this.props
  console.log("current page 1: ", currentPage)
  const renderMobileMenu = (    
        <Menu
          anchorEl={this.state.mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={'mainMobileMenu'}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(this.state.mobileMoreAnchorEl)}
          onClose={this.handleMobileMenuClose}
        >
         {currentPage === 'home' ?
         <div> 
          <MenuItem>           
            <IconButton aria-label="Add category" color="inherit" onClick={()=>{ this.handelAddCategory() }}>
                <AddBoxIcon />
            </IconButton>
            <p>Add category</p>
          </MenuItem>
          <MenuItem>           
            <IconButton aria-label="Edit category" color="inherit" onClick={()=>{ this.handleEditCategory() }}>
                <EditIcon />
            </IconButton>
            <p>Edit category</p>                   
          </MenuItem>
          <MenuItem>            
            <IconButton aria-label="Delete category" color="inherit" onClick={(node)=>{ this.handlerRemoveCategory(node) }}>
                <DeleteIcon />
            </IconButton>
            <p>Delete category</p>
          </MenuItem>
          </div>
          :
          <div>
            <MenuItem>                
                <IconButton aria-label="Edit category" color="inherit" onClick={()=>{ this.handelHomeRedirect() }}>
                    <HomeIcon />
                </IconButton>
                <p>Home</p> 
            </MenuItem>
            <MenuItem>                
                <IconButton aria-label="Delete category" color="inherit" onClick={()=>{ currentPage !== 'edit' ? this.handelSaveCategory() : this.handleUpdateCategory() }}>
                    <SaveIcon />
                </IconButton>
                <p>Save category</p>
            </MenuItem>
          </div>
          }     
        </Menu>
    );  
  console.log("curent page: ", currentPage) 
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>         
          <Typography className={classes.title} variant="h6" noWrap>
            My Location
          </Typography> 
          <div className={classes.grow} />
          {currentPage === 'home' ?
            <div className={classes.sectionDesktop}> 
                <IconButton aria-label="Add category" color="inherit" onClick={()=>{ this.handelAddCategory() }}>             
                    <AddBoxIcon />             
                </IconButton>          
                <IconButton aria-label="Edit category" color="inherit" onClick={()=>{ this.handleEditCategory() }}>
                    <EditIcon />
                </IconButton>                                
                <IconButton aria-label="Delete category" color="inherit" onClick={(node)=>{ this.handlerRemoveCategory(node) }}> 
                    <DeleteIcon />
                </IconButton>                       
            </div>
          :
            <div className={classes.sectionDesktop}>                
                <IconButton aria-label="Edit category" color="inherit" onClick={()=>{ this.handelHomeRedirect() }}>
                    <HomeIcon />
                </IconButton>                           
                <IconButton aria-label="Save category" color="inherit" onClick={()=>{ currentPage !== 'edit' ? this.handelSaveCategory() : this.handleUpdateCategory() }}>             
                    <SaveIcon />             
                </IconButton>                                  
            </div>
          }
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={'mainMobileMenu'}
              aria-haspopup="true"
              onClick={this.handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}     
    </div>
  );
}
}

const mapStateToProps = (store) => { 
    console.log("store: ", store)    
    return {
        currentPage: store.currentPage, 
        newCategoryName: store.newCategoryName,
        listCategories: store.listCategories,
        selectedCategory: store.selectedCategory,
        actionType: store.actionType,
    }
  }

export default withRouter(connect(mapStateToProps)(withStyles(styles)(NavBar)))