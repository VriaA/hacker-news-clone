//RETURNS HTML TO BE RENDERED FOR EVERY STORY IN THE STORIES ARRAY
export default function Story(story, path) {
    const {url, title, points, user, time_ago, id, comments_count, isFavorite, domain, type} = story

    const storyPoints = points > 1 ? `${points} points` : `1 point`
    const commentCount = comments_count > 1 ? `${comments_count} comments` : `1 comment`
    
    const isItemUrl = url.includes('item')
    const isJob = type === 'job'
    const isItemPage = path === '/item'
    const showFavorite = isItemPage || path === '/favorites'
    
    return `<section class="story">
    
                <div class="index-cntr">
                    <p class="index ${isItemPage ? `story-item-index` : ''} grey-color">${story.index ? story.index : ''}${story.index ? '.' : ''}</p>
                    <img class="triangle" src="../images/triangle.svg">
                </div>
                    
                <div class="story-body">
    
                        <h2 class="story-headline">
                            <a href="${isItemUrl ? `#/item?id=${id}` : url}">${title}</a>
                            ${domain ? `<a class="story-domain grey-color clickable" href="https://${domain}">(${domain})</a>` : ''}
                        </h2> 

                    <div class="story-info">
                        ${points ? `<p class="points grey-color">${storyPoints}</p>` : ''}
                        ${user ? `<p class="author grey-color"> by ${user}</p>` : ''}
                        <p class="time-ago grey-color">${time_ago}</p>
                        ${ showFavorite ? `<p class="favorite grey-color clickable" data-story='${JSON.stringify(getFavoriteObj(story))}' >${isFavorite ? 'remove from favorites' : 'favorite'}</p>` : ''}
                        ${!isJob ? `<a class="comments grey-color clickable" href="#/item?id=${id}">${comments_count ? commentCount : `discuss`}</a>` : ''}
                    </div>
                </div>
            </section>`
}

//RETURNS AN OBJECT CONTAINING FORMATTED STORY DATA TO BE STRINGIFIED USING JSON.stringify() WITHOUT CAUSING ANY ERROR
function getFavoriteObj(story) {
    const {url, title, points, user, time_ago, id, comments_count, isFavorite} = story
    
    const toBeFavorited = {
        id: id,
        title: title.replace(/'/g, '&apos;'),
        url: url,
        points: points,
        user: user,
        time_ago: time_ago,
        comments_count: comments_count,
        isFavorite: isFavorite
    }
    
    return toBeFavorited
}