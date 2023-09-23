//CHECKS IF A STORY IS IN FAVORITES
export default function isInFavorites(favorites, story) {
                    return favorites.some(favorite=> favorite.id === story.id)
                }