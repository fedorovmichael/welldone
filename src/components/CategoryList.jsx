import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import store from './../store';
import * as actionFun from './../actions';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop:30,
    marginLeft:50,
  },
  listItem: {
      borderBottom: 'solid 1px #ddd',
  }
});

 class CategoryList extends React.Component{
  
    constructor(props){
        super(props)
        this.state = {selectedIndex: null}
    }    

  handleListItemClick = (event, index, catId) => {
    this.setState({selectedIndex: index});
    store.dispatch(actionFun.setSelectedCategory(catId));
  };

  render(){
      const { selectedIndex } = this.state;
      const {classes, listCategories} = this.props;
      let liCategories = [];
      if(listCategories !== null && listCategories.length > 0){
        liCategories = listCategories.map((cat, i) => {
            return  <ListItem
                   button                                   
                   key={cat.id}
                   selected={selectedIndex === i}
                   className={classes.listItem}
                   onClick={event => this.handleListItemClick(event, i, cat.id)}>
                   <ListItemText primary={cat.name} />
               </ListItem>                            
          })
      }
      
    return (
        <div className={classes.root}>            
            {listCategories !== null && listCategories.length > 0 ?
                <div>
                    <h3>Categories</h3> 
                    <List component="nav" aria-label="secondary mailbox folder">
                    {liCategories}
                    </List>
                </div>
            :
             <p>No Categories</p> 
            }
        </div>
    );
  }
}
const mapStateToProps = (store) => {    
    return {
        listCategories: store.listCategories,
    }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(CategoryList)))