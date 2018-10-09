


const initialState = {
    activePage: 'Main',
    usefulData: null,
    photos: [],
    buttonDisplay: false,
    error: {},
    searchPhrase: 'cats',
    loading: true,
    pagination: false,
    sortOptions: [ 
        {
            text: 'Most relevant',
            value: 'relevance',
            id: 1
        },
        {
            text: 'Date posted asc',
            value: 'date-posted-asc',
            id: 2
        },
        {
            text: 'Date posted desc',
            value: 'date-posted-desc',
            id: 3
        },
        {
            text: 'Date taken asc',
            value: 'date-taken-asc',
            id: 4
        },
        {
            text: 'Date taken desc',
            value: 'date-taken-desc',
            id: 5
        },
        {
            text: 'Interestingness-asc',
            value: 'interestingness-asc',
            id: 6
        },
        {
            text: 'Interestingness-desc',
            value: 'interestingness-desc',
            id: 7
        }
     ],
    sortedBy: 'relevance',
    coords: {},
    paginationPage: 1
}



const reducer = (state = initialState, action) => {
    const currentState={
        ...state,
        sortOptions: [...state.sortOptions],
        photos: [...state.photos],
        error: {...state.error},
        coords: {...state.coords}
    }

    // VIEW CHANGE ACTIONS //
    if (action.type === 'CHANGE_VIEW'){

        switch (action.page){
            case ('Main'): 
                return{
                    ...currentState,
                    searchPhrase: 'Cats',
                    activePage: action.page
                }
            case ('Search'): 
                return{
                    ...currentState,
                    activePage: action.page,
                    photos: [],
                    searchPhrase: ''
                }
            case ('Cat Map'): 
                return{

                    ...currentState,
                    activePage: action.page,
                    loading: true
                }
            case('User Photos'):
            
                return {
                    ...currentState,
                    activePage: action.page,
                    sortedBy: 'relevance'
                }
            default:
                return{
                    ...state,
                    activePage: 'Main'
                }
        }
    }
    //GALLERY UPDATE ACTION//
   if (action.type === 'GET_GALLERY'){
    
    switch(action.data.stat){
        case ("fail"): 
            return {
                ...currentState,
                activePage: "Error",
                error: {
                    msg: action.data.message,
                    code: action.data.code
                },
                loading: false
            }
        case("ok"): 
            return {
                ...currentState,
                photos: [...action.data.photos.photo],
                paginationPage: action.data.photos.page,
                loading: false
            }
            default:
            return {
                ...currentState
            }
    }
       
   }



   //SEARCH COMPONENT ACTIONS//
   if (action.type === "INPUT_UPDATE"){
       
        return {
            ...currentState,
            searchPhrase: action.phrase
       }
   }
   //CLEAR GALLERY ACTIONS//

   if ( action.type === "CLEAR" ) {
       return {
            ...currentState,
            searchPhrase: '',
            photos: []
       }
   }

   //PAGINATE//

   if(action.type === "PAGINATE") {
       switch(action.bool){
           case ( true ):
           return{
               ...currentState,
               pagination: action.bool,
               paginationPage: currentState.paginationPage + 1
           }
           case ( false ):
           return {
               ...currentState,
               pagination: action.bool,
               photos: [...currentState.photos, ...action.data.photos.photo]
           }
           default:
           return {
               ...currentState
           }
       }
   }
   if(action.type === "COORD") {
       return action.coords? 
        { ...currentState, coords: {lat: action.coords.coords.latitude, lon: action.coords.coords.longitude} } : 
        { ...currentState }
   }
   //LOADER//
   if (action.type === "LOAD"){
       
       return action.data? 
        { ...currentState, loading: true, usefulData: action.data } : 
        { ...currentState, loading: true}
   }

   //GO TOP BUTTON//
   if (action.type === "GO_TOP_BUTTON") {
        return action.bool? 
        { ...currentState, buttonDisplay: true } :
        {...currentState, buttonDisplay: false}
   }
   //SORT ACTIONS // 
   if (action.type === "SORT") {
       return{
           ...currentState,
           sortedBy: action.order
       }
   }

   //ERROR UPDATE ACTION//
   if (action.type === 'ERROR'){
       
    let currentState = {
        ...state,
        photos: [...state.photos],
        error: {...state.error}
    }
    return {
        ...currentState,
        activePage: 'Error',
        error: {
            code: '404',
            msg: action.error.message
        }
    }
   
}

    return state
}

export default reducer;