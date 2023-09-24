const loader = document.getElementById('loader')

function renderLoader(isFavoriteClicked) {
    if(!isFavoriteClicked) {
        loader.style.display = 'block'
    }
}

function hideLoader() {
    setTimeout(_=> {
        loader.style.display = 'none'
    }, 1050)
}

export {renderLoader, hideLoader}