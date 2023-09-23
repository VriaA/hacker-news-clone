//RETURNS HTML FOR EACH COMMENT AND ITS NESTED COMMENTS IF AVAILABLE
export default function Comment(comment, i, array, rootId='', parentId='', isLast=false) {
    const {id, comments, level, user, time_ago, content} = comment
    const hasNestedComments = comments.length > 0;
    const previousComment = array[i - 1]
    const nextComment = array[i + 1]
    const commentCount = getCommentCount(comment)
    const isLastComment = (level === 0) && (i === array.length - 1)
    let hideNext = false

    if(level === 0) {
        rootId = id
    }

    if(isLastComment) {
        isLast = true
    }

    if(isLastComment || isLast && !nextComment) {
        hideNext = true
    }
  
    return `<div id="${id}" class='comment comment-level-${Number(level) + 1}'>
                <div class="comment-info">
                    <img id="triangle-${id}" class="triangle triangle-comment" src="../images/triangle.svg">
                    <p class="grey-color">${user}</p>
                    <p class="grey-color">${time_ago}</p>
                    ${level > 1  ? `<p class="comment-nav grey-color clickable" data-comment-nav="${rootId}">root</p>` : ''}
                    ${level !== 0 ? `<p class="comment-nav grey-color clickable" 
                        data-comment-nav="${parentId ? parentId : ''}">parent</p>`: ''}
                    ${i >= 1 ? `<p class="comment-nav grey-color clickable" data-comment-nav="${previousComment.id}">prev</p>`: ''}
                    ${ !hideNext ? `<p class="comment-nav grey-color clickable" data-comment-nav="${nextComment ? nextComment.id : id}">next</p>`: ''}
                    <p id="${id}" class="grey-color clickable count-cntr" data-count-id='${id}'  data-count='${commentCount}'>[&ndash;]</p>
                </div>
                
                <div class="comment-content" id="content-${id}">
                ${content}
                ${renderNestedComments(hasNestedComments, comment, rootId, isLast)}
                </div>
            </div>`
}

//RETURNS HTML FOR THE NESTED COMMEMTS OF A COMMENT
function renderNestedComments(hasNestedComments, comment, rootId, isLast) {
    const {id, comments} = comment
    if (hasNestedComments) {
        const parentId = id
        return comments.map( (comment, i, array) =>  {
            return Comment(comment, i, array, rootId, parentId, isLast)
        }).join("")
    } 
    return ''
}

//RETURNS THE TOTAL NUMBER OF COMMENTS NESTED UNDER A COMMENT
function getCommentCount(comment) { 
    const { comments } = comment
    if(!comments || comments.length === 0) return 1

    let count = 1
    for (const nestedComment of comments) {
        count += getCommentCount(nestedComment)
    }
        return count
}