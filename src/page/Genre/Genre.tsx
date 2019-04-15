import React from 'react';
import { connect } from 'react-redux'
import { getGenreToEdit } from '../../action/genreActions';
import FormGenre from '../../component/FormGenre/FormGenre';
import ListGenre from '../../component/ListGenre/ListGenre';

/*****************************************************************
 * 
 * page d'affichage présentant le composant de création / modification de genre
 * 
**************************************************************** */

class Genre extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

    }
    componentDidMount() {
        const idGenre: string = (this.props.match.params.id);
        if (idGenre) {
            this.props.dispatch(getGenreToEdit(idGenre));
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col center-left s12 m8 l6">
                        <FormGenre />
                    </div>
                </div>
                <div className="row">
                    <div className="col center-left s12">
                        <ListGenre />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        genreToEdit: state.genreToEdit
    };
}
//abonnement au store
export default connect(mapStateToProps)(Genre)