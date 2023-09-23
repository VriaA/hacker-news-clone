import { Stories } from "./pages/stories.js"
import Comments from "./pages/item.js"

//NEW ROUTER
const router = new Navigo(null, true, '#')

//ROUTER HANDLER
class routerHandler {
    //CONSTRUCTOR WITH METHOD FOR CREATING ROUTES
    constructor() {
        this.createRoutes()
    }

    //METHOD FOR CREATING ROUTES
    createRoutes() {
        //AN ARRAY OF OBJECTS THAT CONTAIN A PATH AND A CORRESPONDING FUNCTION 
        const routes = [
            {path: '/', page: Stories},
            {path: '/new', page: Stories},
            {path: '/ask', page: Stories},
            {path: '/show', page: Stories},
            {path: '/item', page: Comments},
            {path: '/jobs', page: Stories},
            {path: '/favorites', page: Stories}
        ]

        //MAPS A PATH TO A FUNCTION
        routes.forEach( ({path, page}) => {
            router.on(path, ()=> {
                page(path)
            }).resolve()
        })
    }
}

export default routerHandler