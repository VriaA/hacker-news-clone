import baseUrl from "../utils/baseUrl.js";
import handleFavoriteClick from "../utils/handleFavoriteClick.js";
import isInFavorites from "../utils/isInFavorites.js";
import {renderLoader, hideLoader} from "../utils/loader.js"
import view from "../utils/view.js"
import Comment from "../components/comment.js";
import Story from "../components/story.js";
import store from "../store.js";

//RENDERS THE SELECTED STORY, ITS CONTENT, A FORM FOR POSTING COMMENTS AND THE STORY COMMENTS WHEN CALLED
export default async function Comments() {
   renderLoader()
    const { favorites } = store.getState()
    const path = '/item'
    window.scrollTo(0, 0)

    let hasError = false

        try {
            const commentsData = await getComments()
            const hasComments =  commentsData.comments.length > 0
            const { comments, content} = commentsData

            view.innerHTML =    `${Story({...commentsData, isFavorite: isInFavorites(favorites, commentsData)}, path)}
                                    <div class="story-content-comments">
                                        ${content ? content : ''}
                                    </div>
                                    <form id="add-comment-form" class="add-comment-form">
                                        <textarea class="comment-textarea" aria-label="Type a comment" rows="8" cols="80"></textarea>
                                        <div class="btn-and-msg-cntr">
                                            <button id="add-comment-btn" class="add-comment-btn" type="submit">add comment</button>
                                            <div id="add-comment-form-message" class="add-comment-form-message hidden">This feature is not available yet.</div>
                                        </div>
                                    </form>
                                ${hasComments ? comments.map((comment, i, array) => Comment(comment, i, array)).join('') : ''}`
            handleFavoriteClick(path)
            scrollToComment()
            toggleCommentDisplay()
            renderFormMessage()

        } catch(error) {
            hasError = true
        }

        if(hasError) {
            view.innerHTML = `<P class="no-result error">Error fetching story</P>`
        }
    hideLoader()
}

//GETS COMMENTS FOR A STORY WITH ITS ID IN THE URL USING AN API
async function getComments() {
    const itemId = window.location.hash.split('?id=')[1]
    const response = await fetch(`${baseUrl}/item/${itemId}`)
    const data = await response.json()
    return data
}

//SCROLLS TO A CORRESPONDING COMMENT WHEN EITHER ROOT, PARENT, PREV OR NEXT IS CLICKED
function scrollToComment() {
    const commentNavLinks = document.querySelectorAll('.comment-nav')

    commentNavLinks.forEach(navLink=> {
        navLink.addEventListener('click', _=> {
            if(navLink.innerText === 'next') {
                const commentEl = navLink.parentElement.parentElement
                scrollToNextComment(commentEl)
            } else {
                //USES THE ID OF THE CORRESPONDING COMMENT SAVED IN THE navLink's DATA ATTRIBUTE TO TARGET THE COMMENT
                const targetCommentid = navLink.dataset.commentNav
                const targetComment = document.getElementById(targetCommentid)
                targetComment.scrollIntoView()
            }
        })
    })
}

//SCROLLS TO THE NEXT COMMENT WHEN CALLED
function scrollToNextComment(commentEl) {

    if(commentEl.nextElementSibling) {
        //SCROLLS TO THE NEXT COMMENT WHEN A CLICKED LINK HAS A NEXT ELEMENT SIBLING (NEXT COMMENT) 
        commentEl.nextElementSibling.scrollIntoView()
    } else {
        //GOES UP A COMMENT UNTIL THE CURRENT COMMENT HAS A NEXT ELEMENT SIBLING (NEXT COMMENT) TO SCROLL TO
        scrollToNextComment(commentEl.parentElement)
    }
}

//HIDES OR REVEALS THE CONTENT OF A COMMENT WHEN CALLED DEPENDING ON THE CONTENT'S VISIBILITY
function toggleCommentDisplay() {
    const countCntrs = document.querySelectorAll('.count-cntr')
    countCntrs.forEach(container=> {
        container.addEventListener('click', _=> {
            const commentCount = container.dataset.count
            const commentContentEl = document.getElementById(`content-${container.id}`)
            const triangleIcon = document.getElementById(`triangle-${container.id}`)
            
            commentContentEl.classList.toggle('hidden')
            triangleIcon.classList.toggle('hidden')

            const isHidden = commentContentEl.classList.contains('hidden')

            container.textContent = isHidden ? `[${commentCount} more]` : `[-]`
        })
    })
}

//RENDERS A MESSAGE WHEN THE ADD COMMENT FORM IS SUBMITTED
function renderFormMessage() {
    const formEl = document.getElementById('add-comment-form')
    const formMsg = document.getElementById('add-comment-form-message')
    formEl.addEventListener('submit', (e)=> {
        e.preventDefault()
        formMsg.classList.remove('hidden')
        setTimeout(()=> {
            formMsg.classList.add('hidden')
        }, 2500)
    })
}