import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Accueil from './page/Accueil';
import EditFilm from './page/Film/EditFilm';
import Genre from './page/Genre/Genre';

/*****************************************************************
 * 
 * Router de l'application
 * 
**************************************************************** */

export default class Routes extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {

        return (
            <Router>
                <Route exact path="/" component={Accueil} />
                <Route path="/film/edit/:id" component={EditFilm} />
                <Route path="/film/add" component={EditFilm} />
                <Route path="/genre" component={Genre} />
            </Router>
        )
    }
}
