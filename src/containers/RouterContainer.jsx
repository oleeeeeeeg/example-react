import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RouterPath from './../constants/RouterPath';
import ListContainer from './ListContainer';
import DetailsContainer from './DetailsContainer';
import MasterDetailContainer from './MasterDetailContainer';

export default class RouterContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route
                        path={RouterPath.LIST}
                        component={ListContainer}
                    />
                    <Route
                        path={`${RouterPath.DETAILS}/:repo`}
                        component={DetailsContainer}
                    />
                    <Route
                        path={RouterPath.MASTER_DETAIL}
                        component={MasterDetailContainer}
                    />
                    <Route exact path="/" component={ListContainer} />
                    <Route component={ListContainer} />
                </Switch>
            </div>
        );
    }
}
RouterContainer.propTypes = {

};
