import axios from 'axios';


const API_KEY = 'aa0db9a5feabb28657a24aa31458b7ff';
const MAP_KEY = 'AIzaSyCDMDAE2JH7pkaNP5YUDDJW6fx7lCgHrdA'
const API_SECRET = 'a12aa567a463e6f5'
const API_ENDPOINT = 'https://api.flickr.com/services/rest'
export const GET_GALLERY = (search="", page = 1, sort = 'relevance', lat, lon) => {
    return axios.get(API_ENDPOINT, {
       params: {
           method: 'flickr.photos.search',
           api_key: API_KEY,
           text: search,
           content_type: 1,
           extras: 'description, date_taken, owner_name',
           sort: sort,
           per_page: 50,
           page: page,
           lat: lat,
           lon: lon,
           format: 'json',
           nojsoncallback: 1
           
       } 
    })
}

export const GET_GALLERY_OF = (user_id, page = 1, sort = 'relevance') => {
    return axios.get (API_ENDPOINT, {
        params: {
            method: 'flickr.photos.search',
            user_id: user_id,
            api_key: API_KEY,
            extras: 'description, date_taken, views, owner_name',
            sort: sort,
            per_page: 25,
            page: page,
            format: 'json',
            nojsoncallback: 1
        }
    })
}

export const GET_COORDS = () => {
    return new Promise ( (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
            
}


