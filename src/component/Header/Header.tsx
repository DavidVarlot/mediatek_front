import React, { Component } from 'react';
import './style.css';


class Header extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {

    }

    render() {

        return (
            <React.Fragment>
                <div className="row">
                    <nav className="grey darken-2">
                        <div className="nav-wrapper">

                            <a href="#" className="brand-logo center hide-on-small-only">Filmothèque</a>
                            <ul id="nav-mobile" className="left">
                                <li><a href="/"><i className="material-icons" >home</i></a></li>
                                <li className="hide-on-med-and-up"><a href="/film/add">Ajouter un film</a></li>
                                <li><a href="/genre">Genres</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </React.Fragment>
        );
    }
}

export default Header;
