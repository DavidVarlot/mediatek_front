import React, { Component } from 'react';
import { connect } from 'react-redux'
import { postGenre } from './../../action/genreActions';

class FormGenre extends Component<any, any> {
    private _nom: string = '';
    private _inputNom: any;

    constructor(props: any) {
        super(props);
        this._inputNom = React.createRef();
        // this.handleNomChange = this.handleNomChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            formIsValid: true,
            nomValidate: false, nomValidateMessage: ''
        };
    }

    clearInputForm() {
        this._inputNom.current.value = '';
    }

    /************************
    * validation
    *********************** */

    validateNom(): boolean {
        let message: string = '';
        let isValid: boolean = true;
        if (this._inputNom.current.value && this._inputNom.current.value != '') {
            if (this._inputNom.current.value.length > 50) {
                isValid = false;
                message = 'Le nom ne doit pas dépasser 50 caractères';
            }
        } else {
            isValid = false;
            message = 'Le nom du genre est obligatoire';
        }
        this.setState({ titreValidateMessage: message, titreValidate: isValid });
        return isValid;
    }

    /************************
    * Listener
    *********************** */

    /* handleNomChange(event: any) {
        this._nom = event.target.value;
    } */

    handleSubmit(event: any) {
        if (this.validateForm()) {
            this.setState({ formIsValid: true });
            this.props.genreToEdit.nom = this._inputNom.current.value;
            this.props.dispatch(postGenre(this.props.genreToEdit));
            this.clearInputForm();
        } else {
            this.setState({ formIsValid: false });
        }
    }

    /************************
    *  validation générale du formulaire
    *********************** */

    validateForm(): boolean {
        return (this.validateNom());
    }

    /************************
     Rendu composant
    *********************** */
    render() {
        return (
            <div>
                <div className="formWarning">{this.state.titreValidateMessage}</div>
                <label>Nom<input type="text" ref={this._inputNom} defaultValue={this.props.genreToEdit.nom} name="nom" /></label>
                <a className="waves-effect waves-light btn" onClick={this.handleSubmit} >Ajouter</a>
                {this.state.formIsValid ? '' : <div className="card-panel warningMessage">Vérifier le formulaire</div>}
            </div>

        )
    }
}
//export default FormFilm;
//binding props/store
const mapStateToProps = (state: any) => {
    return {
        genreToEdit: state.genreToEdit,
    };
}
//abonnement au store
export default connect(mapStateToProps)(FormGenre)