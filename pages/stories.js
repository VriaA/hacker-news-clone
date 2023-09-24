import loader from "../utils/loader.js"
import Story from "../components/story.js"
import Job from "../components/job.js"
import baseUrl from "../utils/baseUrl.js"
import isInFavorites from "../utils/isInFavorites.js"
import handleFavoriteClick from "../utils/handleFavoriteClick.js"
import view from "../utils/view.js"
import store  from "../store.js";

//RENDERS PAGE CONTENT WHEN CALLED.
async function Stories(path) {
    loader.style.display = 'block'
        await render(path)
    setTimeout(_=> {
        loader.style.display = 'none'
    }, 1050)
}

//RENDERS STORIES IF THERE IS NO ERROR.
//RENDERS AN ERROR MESSAGE IF AN ERROR OCCURED.
async function render(path) {
    let hasAnError = false
    try {
        const {favorites} = store.getState()
        const isFavoritesPage = path === '/favorites'
        const isJobPage = path === '/jobs'
        const stories = isFavoritesPage ? favorites : await getStories(path)
        const hasStories = stories.length > 0

        setStoriesHTML(hasStories, stories, isJobPage, favorites, path, isFavoritesPage)

    } catch(error) {
        hasAnError = true
    }

    if(hasAnError) {
        view.innerHTML = `<p class="no-result error"> An error occurred, please refresh the page.</p>`
    }
}

//FETCHES STORIES RELATED TO THE CURRENT PATH USING AN API
async function getStories(path) {
    path = path === '/' ? '/news' : path === '/new' ? '/newest' : path
    const response = await fetch(`${baseUrl}${path}`)
    const data = await response.json()
    return data
}

//PASSES THE STORIES HTML TO THE VIEW ELEMENT
function setStoriesHTML(hasStories, stories, isJobPage, favorites, path, isFavoritesPage) {
    setTimeout(_=> {
        view.innerHTML =  `<div>
                                ${hasStories ? stories.map((story, i)=> {
                                    if (isJobPage) {
                                        return Job({...story, index: i + 1})
                                    } else {
                                        return Story({...story, index: i + 1, isFavorite: isInFavorites(favorites, story)}, path)
                                    } 
                                } ).join('') : !hasStories && isFavoritesPage ? `<p class='no-result'>No favorites</p>` : `<p class='no-result'>No stories</p>` }
                            </div>`
        handleFavoriteClick(path)
    }, 1000)
}

export {Stories, getStories}