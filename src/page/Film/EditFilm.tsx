import React from 'react';
import { connect } from 'react-redux'
import { getFilmToEdit } from '../../action/filmAction';
import FormFilm from '../../component/FormFilm/FormFilm';

/*****************************************************************
 * 
 * page d'affichage présentant le composant de création / modification de film
 * 
**************************************************************** */

class EditFilm extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

    }
    componentDidMount() {
        const idFilm: string = (this.props.match.params.id);
        if (idFilm) {
            this.props.dispatch(getFilmToEdit(idFilm));
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col center-left s12 m8 l6">
                        <FormFilm />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        filmToEdit: state.filmToEdit
    };
}
//abonnement au store
export default connect(mapStateToProps)(EditFilm)