import Genre from './../model/Genre';
import axios from 'axios';
import { Config } from './../constants';

/*****************************************************************
 * 
 * Actions sur les genres
 * 
**************************************************************** */
// Actions are payloads of information that send data from your application to your store. 
// They are the only source of information for the store. You send them to the store using store.dispatch().

export function postGenre(genre: Genre) {
    return function (dispatch: any) {
        axios.post(Config.URL_API + 'Genres', genre)
            .then((response) => {
                dispatch({
                    type: 'POST_GENRE',
                    payload: response.data
                });
            })
    }
}

export function getAllGenre() {
    return function (dispatch: any) {
        axios.get(Config.URL_API + 'Genres')
            .then((response) => {
                dispatch({
                    type: 'GET_ALL_GENRE',
                    payload: response.data
                });
            })
    }
}

export function getGenreToEdit(idGenre: string) {
    return function (dispatch: any) {
        axios.get(Config.URL_API + 'Genres/' + idGenre)
            .then((response) => {
                dispatch({
                    type: 'GET_GENRE_TO_EDIT',
                    payload: response.data
                });
            })
    }
}

export function getGenre(idGenre: string) {
    return function (dispatch: any) {
        axios.get(Config.URL_API + 'Genres/' + idGenre)
            .then((response) => {
                dispatch({
                    type: 'GET_GENRE',
                    payload: response.data
                });
            })
    }
}

export function deleteGenre(id: String) {
    return function (dispatch: any) {
        axios.delete(Config.URL_API + 'Genres', { data: id })
            .then((response) => {
                dispatch({
                    type: 'DELETE_GENRE',
                    payload: id
                });
            })
    }

}