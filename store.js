//RETURNS AN OBJECT WITH TWO METHODS FOR MANAGING STATE
function createStore(reducer) {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteStories'))
    let currentState = savedFavorites || reducer(undefined, {})
    
    return {
        getState: () => currentState,
        dispatch: action =>  {
            currentState = reducer(currentState, action)
        }
    }
}

//INITIAL STATE
const initialState = {
    favorites: []
}

//REDUCER FOR TOGGLING ITEMS IN AND OUT OF FAVORITES
function favoritesReducer(state = initialState, action) {
    switch(action.type) {
    
        case 'ADD_FAVORITE': {
            const favorites = [...state.favorites, action.payload.favorite]
            return { favorites } 
        }
        case 'REMOVE_FAVORITE': {
            const favorites = state.favorites.filter(item=> item.id != action.payload.favorite.id)
            return { favorites } 
        }
        default: {
            return state
        }
    }
}

//OBJECT FOR MANAGING STATE
const store = createStore(favoritesReducer)

export default store