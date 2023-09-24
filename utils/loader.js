const loader = document.getElementById('loader')

//RENDERS LOADER
function renderLoader(isFavoriteClicked) {
    if(!isFavoriteClicked) {
        loader.style.display = 'block'
    }
}

//HIDES LOADER
function hideLoader() {
    setTimeout(_=> {
        loader.style.display = 'none'
    }, 1050)
}

export {renderLoader, hideLoader}