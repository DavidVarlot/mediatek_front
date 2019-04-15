import Film from './../model/Film';
import Genre from './../model/Genre';
import axios from 'axios';
import { Config } from './../constants';

/*****************************************************************
 * 
 * Actions sur les films
 * 
**************************************************************** */
// Actions are payloads of information that send data from your application to your store. 
// They are the only source of information for the store. You send them to the store using store.dispatch().

export function postFilm(film: Film) {
    return function (dispatch: any) {
        axios.post(Config.URL_API + 'Films', film)
            .then((response) => {
                dispatch({
                    type: 'POST_FILM',
                    payload: response.data,
                    toastMessage: 'Le film a bien été modifié'
                });
            }).catch((response) => dispatch({
                type: 'DISPLAY_ERROR',
                toastError: 'Une erreur s\'est produite. Le film n\'a pas été modifié'
            }));;
    }
}

export function addFilm(film: Film) {
    return function (dispatch: any) {
        axios.post(Config.URL_API + 'Films', film)
            .then((response) => {
                dispatch({
                    type: 'ADD_FILM',
                    payload: response.data,
                    toastMessage: 'Le film a bien été ajouté'
                });
            }).catch((response) => dispatch({
                type: 'DISPLAY_ERROR',
                toastError: 'Une erreur s\'est produite. Le film n\'a pas été ajouté'
            }));
    }
}

export function getAllFilm() {
    return function (dispatch: any) {
        axios.get(Config.URL_API + 'Films')
            .then((response) => {
                dispatch({
                    type: 'GET_ALL_FILM',
                    payload: response.data,
                    filtre: new Array<string>(),
                    toastMessage: null
                });
            }).catch((response) => dispatch({
                type: 'DISPLAY_ERROR',
                toastError: 'Une erreur s\'est produite.'
            }));
    }
}

export function getFilmToEdit(idFilm: string) {
    return function (dispatch: any) {
        axios.get(Config.URL_API + 'Films/' + idFilm)
            .then((response) => {
                dispatch({
                    type: 'GET_FILM_TO_EDIT',
                    payload: response.data,
                    toastMessage: null
                });
            })
    }
}

export function getFilmsByGenre(genre: Genre) {
    return function (dispatch: any) {
        axios.get(Config.URL_API + 'Films/Genre/' + genre.id)
            .then((response) => {
                dispatch({
                    type: 'GET_FILMS_BY_GENRE',
                    payload: response.data,
                    filtre: genre.nom,
                    toastMessage: null
                });
            })
    }
}

export function getFilm(idFilm: string) {
    return function (dispatch: any) {
        axios.get(Config.URL_API + 'Films/' + idFilm)
            .then((response) => {
                dispatch({
                    type: 'GET_FILM',
                    payload: response.data,
                    toastMessage: null
                });
            })
    }
}

export function deleteFilm(id: String) {
    return function (dispatch: any) {
        axios.delete(Config.URL_API + 'Films', { data: id })
            .then((response) => {
                dispatch({
                    type: 'DELETE_FILM',
                    payload: id,
                    toastMessage: null
                });
            })
    }
}


export function countFilmsByGenre(idgenre: string) {
    return function (dispatch: any) {
        axios.get(Config.URL_API + 'Films/Genre/' + idgenre + '/Count')
            .then((response) => {
                dispatch({
                    type: 'COUNT_FILMS_BY_GENRE',
                    payload: response.data,
                    toastMessage: null
                });
            })
    }
}