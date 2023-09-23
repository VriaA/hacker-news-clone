import Story from "../components/story.js"
import Job from "../components/job.js"
import baseUrl from "../utils/baseUrl.js"
import isInFavorites from "../utils/isInFavorites.js"
import handleFavoriteClick from "../utils/handleFavoriteClick.js"
import view from "../utils/view.js"
import store  from "../store.js";

//RENDERS STORIES WHEN CALLED
async function Stories(path) {

    const {favorites} = store.getState()
    const isFavoritesPage = path === '/favorites'
    const isJobPage = path === '/jobs'

    let hasAnError = false

    try {
        const stories = isFavoritesPage ? favorites : await getStories(path)
        const hasStories = stories.length > 0

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
    } catch(error) {
        hasAnError = true
    }

    if(hasAnError) {
        view.innerHTML = `<p class="no-result error"> Error fetching stories.<br> Please refresh the page.</p>`
    }

}

//GETS STORIES RELATED TO THE CURRENT PATH USING AN API
async function getStories(path) {
    path = path === '/' ? '/news' : path === '/new' ? '/newest' : path
    const response = await fetch(`${baseUrl}${path}`)
    const data = await response.json()
    return data
}

export {Stories, getStories}