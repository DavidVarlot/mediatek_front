import React from 'react';
import ListFilm from '../component/ListFilm/ListFilm'
import FormFilm from '../component/FormFilm/FormFilm'

/*****************************************************************
 * 
 * page d'affichage pour l'accueil
 * combine les composants suivants :
 * - liste des films
 * - création / modification de film
 * 
**************************************************************** */

class Accueil extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }
    componentDidMount() { }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col s12 m8 l8 xl9">
                        <ListFilm />
                    </div>
                    <div className="col s12 m4 l4 xl3 hide-on-small-only">
                        <h5>Ajouter un film</h5>
                        <FormFilm />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Accueil