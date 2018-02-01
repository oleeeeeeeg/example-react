import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import { FormControl } from 'react-bootstrap';

import * as Actions from './../actions/index';
import RepoDetailsComponent from '../components/RepoDetailsComponent';


class DetailsContainer extends Component {
    constructor() {
        super();
    }

    renderNoItems() {
        return (
            <div>
                Nothing to show
            </div>
        );
    }

    render() {
        const { repos } = this.props.state.userRepos;
        const currentRepoId = parseInt(this.props.match.params.repo, 10);
        const currentRepo = repos.find(repo => repo.id === currentRepoId);
        if (!currentRepoId || !currentRepo) {
            return this.renderNoItems();
        }

        return (
            <div className="details-container">
                <RepoDetailsComponent
                    repoId={currentRepo.id}
                    repoName={currentRepo.name}
                    repoStars={currentRepo.stargazers_count}
                    repoForks={currentRepo.forks_count}
                    repoWatchers={currentRepo.watchers_count}
                />
            </div>
        );
    }
}

DetailsContainer.propTypes = {

};

function mapStateToProps(state) {
    return {
        state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

export default DetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DetailsContainer);
