import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import store from './../store';
import * as actionFun from './../actions';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      marginTop:30,
      marginLeft:50,
    },
  });

  class CategoryEdit extends React.Component{
      constructor(props){
          super(props)
          this.state = {name: '', category: {}}
      }

      onTextChange = (e) =>{
        store.dispatch(actionFun.setNewCategoryName(e.target.value));        
      }

      componentWillMount(){
        const {actionType, listCategories, selectedCategory} = this.props
        if(actionType === 'edit'){
            let category = listCategories.filter(c=>c.id === selectedCategory)
            store.dispatch(actionFun.setNewCategoryName(category.name));
            this.setState({name: category.name, category})
        }
      }

      render(){
          const {classes, newCategoryName} = this.props
          return(
              <div className={classes.root}>
                <TextField
                    required
                    id="standard-required"
                    label="New Category"
                    className={classes.textField}
                    margin="normal"
                    onChange={(node) => this.onTextChange(node)}
                    value={newCategoryName}
                />
              </div>
          )
      }
  }

  const mapStateToProps = (store) => {    
    return {
        newCategoryName: store.newCategoryName,
        actionType: store.actionType,
        listCategories: store.listCategories,
        selectedCategory: store.selectedCategory,       
    }
  }

  export default connect(mapStateToProps)(withStyles(styles)(CategoryEdit))