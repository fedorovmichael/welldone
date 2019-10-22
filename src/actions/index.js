
export function addCategory(category){
    return {type: 'ADD_CATEGORY', categorie: category};
}

export function setCurrentPage(page){    
    return {type: 'SET_CURRENT_PAGE', currentPage: page};
}

export function setSelectedCategory(selectedCategory){
    return {type: 'SET_SELECTED_CATEGORY', selectedCategory: selectedCategory};
}

export function setNewCategoryName(name){
    return {type: 'SET_NEW_CATEGORY_NAME', newCategoryName: name};
}

export function setCategoryList(liCategories){
    return {type: 'SET_CATEGORIES_LIST', listCategories: liCategories};
}

export function setActionType(action){
    return {type: 'SET_ACTION_TYPE', actionType: action};
}

export function updateCategory(){
    return {type: 'SET_UPDATE_CATEGORY', update: 'category'};
}

