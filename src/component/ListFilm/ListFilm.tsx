import React from 'react';
import './style.css';
import Film from './../../model/Film';
import Genre from './../../model/Genre'
import { connect } from 'react-redux';
import { getAllFilm, deleteFilm, getFilmsByGenre } from './../../action/filmAction';

/*****************************************************************
 * 
 * Composant affichant la liste des films sous forme de cards
 * 
**************************************************************** */

class ListFilm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        // on recupère la liste complète des films
        this.props.dispatch(getAllFilm());
    }

    /************************
    * Listener
    *********************** */

    deleteFilm(idFilm: any) {
        this.props.dispatch(deleteFilm(idFilm));
    }

    // clic sur un hashtag genre
    trieFilmByGenre(genre: Genre) {
        const listFiltres: Array<any> = this.props.filtres;
        // on évite les doublons
        if (genre.nom && listFiltres.findIndex(f => f === genre.nom) === -1) {
            this.props.dispatch(getFilmsByGenre(genre));
        }
    }

    trieAll() {
        this.props.dispatch(getAllFilm());
    }

    /************************
     Rendu composant
    *********************** */

    render() {
        return (
            <React.Fragment>

                <div className="barreFiltres">
                    {this.props.filtres.length > 0 ?
                        this.props.filtres.map(
                            (filtre: string) =>
                                <div key={filtre} className="chip" >
                                    {filtre}
                                    <a href='#' onClick={() => this.trieAll()}>
                                        <i className="close material-icons">close</i></a>
                                </div>
                        ) : ''
                    }
                </div>
                {this.props.Films.length > 0 ?
                    this.props.Films.map(
                        (f: Film) =>
                            <div className="col s6 m4 l4 xl3" key={f.id}>
                                <div className="card small grey darken-2 " key={f.titre}>
                                    <div className="card-content white-text">
                                        <span className="card-title">{f.titre}</span>
                                        <p className="">{f.synopsis}</p>
                                    </div>
                                    <div className="tagsListe">{f.genre === undefined ? '' : <a href='#' onClick={() =>
                                        f.genre === undefined ? '' : this.trieFilmByGenre(f.genre)}
                                    >#{f.genre.nom}</a>}</div>
                                    <div className="card-action">
                                        <a href="#" onClick={() => this.deleteFilm(f.id)} ><i className="material-icons small">delete</i></a>
                                        <a href={'/film/edit/' + f.id} ><i className="material-icons" >edit</i></a>
                                    </div>
                                </div>
                            </div>
                    )
                    : 'Aucun film'}
            </React.Fragment>
        )
    }
}

//binding props/store
const mapStateToProps = (state: any) => {
    return {
        Films: state.films,
        filtres: state.filtresActif,
        toastError: state.toastError,
    };
}
//abonnement au store
export default connect(mapStateToProps)(ListFilm)