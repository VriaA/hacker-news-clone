import store from "../store.js"
import { Stories } from "../pages/stories.js"
import Comments from "../pages/item.js"

/*TOGGLES STORIES IN AND OUT OF FAVORITES USING THE STORE WHEN THE FAVORITE BUTTON IS CLICKED,
SAVES THE FAVORITES TO LOCAL STORAGE,
RERENDERS THE PAGE CONTENT*/
export default function handleFavoriteClick(path){
                const isCommentPage = path === '/item'
                const favoriteButtons = document.querySelectorAll('.favorite')
                favoriteButtons.forEach(button=> {
                    button.addEventListener('click', async _=> {
                            const story = JSON.parse(button.dataset.story)
                            store.dispatch({type: story.isFavorite ? 'REMOVE_FAVORITE' : 'ADD_FAVORITE', payload: {favorite: story}})
                
                            const favoriteStories = store.getState()
                            localStorage.setItem('favoriteStories', JSON.stringify(favoriteStories))
                            isCommentPage ? await Comments() : await Stories(path)
                    })
                })
            }