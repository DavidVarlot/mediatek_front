import Film from './../../model/Film';
import Genre from './../../model/Genre';


// on défini le store
export const initialState = {
    films: new Array<Film>(),
    filmToEdit: new Film('', '', new Genre()),

    genres: new Array<Genre>(),
    genreToEdit: new Genre(''),

    filtresActif: new Array<string>(),
    toastMessage: null,
    toastError: null,

    countFilmByGenre: null,
}

/*****************************************************************
 * 
 * Reducer
 * 
**************************************************************** */
/**
 * Le reducer est une fonction dite "pure" ayant (state, action) => state comme signature.
 * Il va décrire comment une action transforme le state (l'état) de l'application 
 * en un nouvel état.
 **/

//TODO : créer un combineReducer

export default function reducer(state = initialState, action: any) {

    switch (action.type) {

        case 'DISPLAY_ERROR':
            return {
                ...state,
                toastError: action.toastError,
            };

        /************************
        * Films
        *********************** */
        case 'GET_FILMS_BY_GENRE':
            return {
                ...state,
                films: action.payload,
                filtresActif: new Array<string>(...state.filtresActif, action.filtre),
                toastMessage: action.toastMessage
            };

        case 'COUNT_FILMS_BY_GENRE':
            return {
                ...state,
                countFilmByGenre: action.payload
            };

        case 'GET_FILM_TO_EDIT':
            return {
                ...state,
                filmToEdit: action.payload,
                toastMessage: action.toastMessage
            };


        case 'ADD_FILM':
            return {
                ...state,
                films: new Array<Film>(...state.films, action.payload),
                filmToEdit: new Film('', '', new Genre()),
                toastMessage: action.toastMessage
            };

        case 'POST_FILM':
            return {
                ...state,
                films: new Array<Film>(...state.films, action.payload),
                filmToEdit: action.payload,
                toastMessage: action.toastMessage
            };

        case 'DELETE_FILM':
            const nextStateFilm: Array<Film> = new Array<Film>(...state.films);
            const indexFilm = nextStateFilm.findIndex(f => f.id === action.payload);
            nextStateFilm.splice(indexFilm, 1);
            return {
                ...state,
                films: nextStateFilm,
                toastMessage: action.toastMessage
            };

        case 'GET_ALL_FILM':
            return {
                ...state,
                films: action.payload,
                toastMessage: action.toastMessage
            };

        /************************
        * Genres
        *********************** */
        case 'GET_GENRE_TO_EDIT':
            return {
                ...state,
                genreToEdit: action.payload
            };

        case 'POST_GENRE':
            return {
                ...state,
                genres: new Array<Genre>(...state.genres, action.payload)
            };

        case 'DELETE_GENRE':
            const nextState: Array<Genre> = new Array<Genre>(...state.genres);
            const indexGenre = nextState.findIndex(f => f.id === action.payload);
            nextState.splice(indexGenre, 1);
            return {
                ...state,
                genres: nextState
            };

        case 'GET_ALL_GENRE':
            return {
                ...state,
                genres: action.payload
            };

        default:
            return state
    }
}