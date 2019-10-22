const initialCategoryState = {
    listCategories: [],    
    category: {id: '', name: '', listLocations: []},
    currentPage: 'home',
    selectedCategory: '',
    newCategoryName: '',
    actionType: '',
}

export default function category(state = initialCategoryState, action){ 
    switch(action.type){
        case "ADD_CATEGORY":
          return {...state, listCategories: [...state.listCategories, action.categorie], currentPage: 'home'};
        case "SET_CURRENT_PAGE":          
          return {...state, currentPage: action.currentPage};
        case "SET_SELECTED_CATEGORY":
          return {...state, selectedCategory: action.selectedCategory}; 
        case "SET_NEW_CATEGORY_NAME":
          return {...state, newCategoryName: action.newCategoryName};
        case "SET_CATEGORIES_LIST":
          return {...state, listCategories: action.listCategories};           
        case "SET_ACTION_TYPE":
          return {...state, actionType: action.actionType};
        case "SET_UPDATE_CATEGORY":
            let cat = state.listCategories.filter(c=>c.id === state.selectedCategory)
            cat.name = state.newCategoryName
            let liCat = state.listCategories.filter(c=>c.id !== state.selectedCategory)
            liCat.push(cat)
          return {...state, listCategories: liCat};
        default:
          return state;
    }    
 }