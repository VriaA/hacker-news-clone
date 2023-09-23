//RETURNS HTML TO BE RENDERED FOR EVERY JOB IN THE STORIES ARRAY
function Job(job) {
    const {id, url, title, time_ago} = job
    const isItemUrl = url.includes('item')
    
    return `<section class="story job">
                <div class="story-body">
                    <div class="story-headline-cntr">
                        <h2 class="story-headline"><a href="${isItemUrl ? `#/item?id=${id}` : url}">${title}</a></h2>
                    </div>   

                    <div class="story-info job-info">
                        <p class="time-ago grey-color">${time_ago}</p>
                    </div>
                </div>
            </section>`
}

export default Job