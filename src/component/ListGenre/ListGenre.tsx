import React from 'react';
import './style.css';
import Genre from './../../model/Genre'
import { connect } from 'react-redux';
import { getAllGenre, deleteGenre } from './../../action/genreActions';
import { Config } from './../../constants';
import axios from 'axios';

/*****************************************************************
 * 
 * Composant affichant la liste des genres
 * 
**************************************************************** */

class ListGenre extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { showSupressionImpossible: false };
    }

    componentDidMount() {
        // on recupère la liste complète des genres
        this.props.dispatch(getAllGenre());

    }

    /************************
    * Listener
    *********************** */

    deleteGenre(idGenre: any) {
        //@TODO : pas terrible, à mettre dans une action
        axios.get(Config.URL_API + 'Films/Genre/' + idGenre + '/Count')
            .then((response) => {
                if (response.data === 0) {
                    // Aucun film n'est attaché à ce type, la supression est possible
                    this.props.dispatch(deleteGenre(idGenre));
                    this.setState({ showSupressionImpossible: false })
                } else {
                    this.setState({ showSupressionImpossible: true })
                }
            })
        // this.props.dispatch(countFilmsByGenre(idGenre)).then((response) => { console.log(response.data) });
        // console.log(this.props.countFilmByGenre);
    }

    /************************
     Rendu composant
    *********************** */

    render() {
        return (
            <React.Fragment>
                {this.state.showSupressionImpossible > 0 ? <div className="card-panel warningMessage">La supresion est impossible, des films sont encore rattachés à ce genre</div> : ''}
                <div>
                    {this.props.genres.length > 0 ?
                        this.props.genres.map(
                            (genre: Genre) =>
                                <span key={genre.id} >
                                    <div className="chip">
                                        {genre.nom}
                                        <a href='#' onClick={() => this.deleteGenre(genre.id)}>
                                            <i className="closeGenre material-icons">close</i></a>
                                    </div>
                                </span>


                        ) : 'Aucun genre'
                    }
                </div>

            </React.Fragment>
        )
    }
}

//binding props/store
const mapStateToProps = (state: any) => {
    return {
        genres: state.genres,
        toastError: state.toastError,
        countFilmByGenre: state.countFilmByGenre,
    };
}
//abonnement au store
export default connect(mapStateToProps)(ListGenre)