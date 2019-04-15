import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux'
import { postFilm, addFilm } from './../../action/filmAction';
import { getAllGenre } from './../../action/genreActions';
import Genre from '../../model/Genre';
import Film from '../../model/Film';
import { any } from 'prop-types';

/*****************************************************************
 * 
 * Composant fomrulaire de création / modification de film
 * 
**************************************************************** */

class FormFilm extends Component<any, any> {

    private _genre: Genre = new Genre();
    private _listGenres: Array<Genre> = new Array<Genre>();
    private _inputGenre: any;
    private _inputTitre: any;
    private _inputSynopsis: any;

    constructor(props: any) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);

        this._inputGenre = React.createRef();
        this._inputTitre = React.createRef();
        this._inputSynopsis = React.createRef();

        this.state = {
            formIsValid: true,
            titreValidate: false, titreValidateMessage: '',
            synopsisValidate: false, synopsisValidateMessage: '',
            genreValidate: false, genreValidateMessage: ''
        };
    }
    componentDidMount() {
        // on recupère la liste des genres de films
        // @TODO : pas terrible
        this.props.dispatch(getAllGenre());
        //this._inputSynopsis.current.value = this.props.filmToEdit.genre.id;
    }

    clearInputForm() {
        this._inputTitre.current.value = '';
        this._inputSynopsis.current.value = '';
        this._inputGenre.current.value = '';
    }

    /************************
    * Listener
    *********************** */

    handleGenreChange(event: any) {
        this._listGenres = this.props.genres;
        const i = this._listGenres.findIndex(genre => genre.id === event.target.value);
        if (i > -1) {
            this._genre = this._listGenres[i];
        }

    }

    handleSubmit(event: any) {
        if (this.validateForm()) {
            this.setState({ formIsValid: true });
            // le formulaire est valide, on met à jour le state de l'application
            this.props.filmToEdit.titre = this._inputTitre.current.value;
            this.props.filmToEdit.synopsis = this._inputSynopsis.current.value;
            this.props.filmToEdit.genre = this._genre;
            if (this.props.filmToEdit.id) {
                // on est en modification
                this.props.dispatch(postFilm(this.props.filmToEdit));
            } else {
                // on est en création
                this.props.dispatch(addFilm(this.props.filmToEdit));
                this.clearInputForm();
            }
        } else {
            this.setState({ formIsValid: false });
        }
    }

    /************************
    * validation
    *********************** */

    validateTitre(): boolean {
        let message: string = '';
        let isValid: boolean = true;
        if (this._inputTitre.current.value) {
            if (this._inputTitre.current.value.length > 50) {
                isValid = false;
                message = 'Le titre de noit pas dépasser 50 caractères';
            }
        } else {
            isValid = false;
            message = 'Le titre est obligatoire';
        }
        this.setState({ titreValidateMessage: message, titreValidate: isValid });
        return isValid;
    }

    validateSynopsis(): boolean {
        let message: string = '';
        let isValid: boolean = true;

        if (this._inputSynopsis.current.value && this._inputSynopsis.current.value.length > 2000) {
            isValid = false;
            message = 'Le synopsis de noit pas dépasser 2000 caractères';
        }
        this.setState({ synopsisValidateMessage: message, synopsisValidate: isValid });
        return isValid;
    }

    validateGenre(): boolean {
        let message: string = '';
        let isValid: boolean = true;

        if (!this._inputGenre.current.value || this._inputGenre.current.value === undefined || this._inputGenre.current.value === '') {
            isValid = false;
            message = 'Le genre est obligatoire';
        }
        this.setState({ genreValidateMessage: message, genreValidate: isValid });
        return isValid;
    }

    /************************
    *  validation générale du formulaire
    *********************** */

    validateForm(): boolean {

        const validateTitre: boolean = this.validateTitre();
        const validateGenre: boolean = this.validateGenre();
        const validateSynopsis: boolean = this.validateSynopsis();
        return (validateTitre && validateGenre && validateSynopsis);
    }

    /************************
     Rendu composant
    *********************** */

    render() {
        return (
            <div>
                <div className="formWarning">{this.state.titreValidateMessage}</div>
                <label>Titre
                    <input ref={this._inputTitre} type="text" defaultValue={this.props.filmToEdit.titre} name="titre" /></label>
                <div className="formWarning">{this.state.genreValidateMessage}</div>

                <label>genre
                    <select name="genre" ref={this._inputGenre} className="browser-default" onChange={this.handleGenreChange}  >
                        <option></option>
                        {this.props.genres.length > 0 ?
                            this.props.genres.map(
                                (g: Genre) => <option key={g.id} value={g.id} >{g.nom}</option>
                            )
                            : <option></option>}
                    </select>

                </label>
                <div className="formWarning">{this.state.synopsisValidateMessage}</div>
                <label>Synopsis<input ref={this._inputSynopsis} type="text" defaultValue={this.props.filmToEdit.synopsis} name="synopsis" /></label>

                <a className="waves-effect waves-light btn" onClick={this.handleSubmit} >{this.props.filmToEdit.id ? "Modifier" : "Ajouter"}</a>
                {this.props.toastMessage && this.state.formIsValid ? <div className="card-panel teal accent-3 white-text">{this.props.toastMessage}</div> : ''}
                {this.state.formIsValid ? '' : <div className="card-panel warningMessage">Vérifiez le formulaire</div>}
            </div >
        )
    }
}


interface StateFromProps {
    filmToEdit: Array<Film>,
    genres: Array<Genre>,
    toastMessage: string,
    toastError: string
}

interface DispatchFromProps {
    handleGenreChange: (event: any) => void;
}

//export default FormFilm;
//binding props/store
const mapStateToProps = (state: any) => {
    return {
        filmToEdit: state.filmToEdit,
        genres: state.genres,
        toastMessage: state.toastMessage,
        toastError: state.toastError,
    };
}

//abonnement au store
export default connect<StateFromProps, DispatchFromProps, void>(mapStateToProps)(FormFilm)