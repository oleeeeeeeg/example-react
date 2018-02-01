import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FormControl, Modal, Col } from 'react-bootstrap';

import * as Actions from './../actions/index';
import ReposListComponent from '../components/ReposListComponent';
import ReposListHeaderContainer from './ReposListHeaderContainer';
import RepoDetailsComponent from '../components/RepoDetailsComponent';
import RouterPath from '../constants/RouterPath';


class MasterDetailContainer extends Component {
    constructor() {
        super();
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleUserRequest = this.handleUserRequest.bind(this);
        this.handlePageClickAction = this.handlePageClickAction.bind(this);
        this.handlePaginationClick = this.handlePaginationClick.bind(this);

        this.handleShowModalDetails = this.handleShowModalDetails.bind(this);
        this.handleCloseModalDetails = this.handleCloseModalDetails.bind(this);

        this.state = {
            user: '',
            showModalDetails: false,
            modalRepoId: 0,
        };
    }

    handleShowModalDetails(repoId) {
        this.setState({
            showModalDetails: true,
            modalRepoId: repoId,
        });
    }

    handleCloseModalDetails() {
        this.setState({
            showModalDetails: false,
        });
    }

    handleUserChange(event) {
        this.setState({
            user: event.target.value,
        });
    }

    handleUserRequest(event) {
        if (event.charCode === 13) {
            const { user } = this.state;
            this.props.actions.userReposRequest({ user });
        }
    }

    handlePageClickAction(repoId) {
        const { changeCurrentRepo } = this.props.actions;
        changeCurrentRepo(repoId);
    }

    handlePaginationClick(number) {
        const { changePage } = this.props.actions;
        changePage(number);
    }
    //------------------------------------------------------------------------------------------------------------------

    renderUserInput() {
        return (
            <FormControl
                type="text"
                value={this.state.user}
                placeholder="Enter username"
                onChange={this.handleUserChange}
                onKeyPress={this.handleUserRequest}
            />
        );
    }

    renderModalDetails() {
        const { showModalDetails, modalRepoId } = this.state;
        const { repos } = this.props.state.userRepos;
        const modalRepo = repos.find(repo => repo.id === modalRepoId);
        if (!modalRepoId || !modalRepo) {
            return null;
        }

        return (
            <Modal show={showModalDetails} onHide={this.handleCloseModalDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RepoDetailsComponent
                        repoId={modalRepo.id}
                        repoName={modalRepo.name}
                        repoStars={modalRepo.stargazers_count}
                        repoForks={modalRepo.forks_count}
                        repoWatchers={modalRepo.watchers_count}
                    />
                </Modal.Body>
            </Modal>
        );
    }

    renderCurrentRepo() {
        const { repos } = this.props.state.userRepos;
        const { currentRepoId } = this.props.state.appState;
        const currentRepo = repos.find(repo => repo.id === currentRepoId);
        if (!currentRepoId || !currentRepo) {
            return null;
        }

        return (
            <Col className="details-container" xs={12} md={6}>
                <RepoDetailsComponent
                    repoId={currentRepo.id}
                    repoName={currentRepo.name}
                    repoStars={currentRepo.stargazers_count}
                    repoForks={currentRepo.forks_count}
                    repoWatchers={currentRepo.watchers_count}
                />
            </Col>
        );
    }

    render() {
        const { repos } = this.props.state.userRepos;
        const { sortField, sortOrder, filters, itemsOnPage, pageNumber } = this.props.state.appState;

        return (
            <div className="list-container">
                <Col xs={12} md={6}>
                    <Link
                        to={RouterPath.LIST}
                    >
                        List
                    </Link>
                    {this.renderUserInput()}
                    <ReposListHeaderContainer />
                    <ReposListComponent
                        repos={repos}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        filters={filters}
                        itemsOnPage={itemsOnPage}
                        pageNumber={pageNumber}
                        onPageClick={this.handlePageClickAction}
                        onModalClick={this.handleShowModalDetails}
                        onPaginationClick={this.handlePaginationClick}
                    />
                </Col>
                {this.renderCurrentRepo()}
                {this.renderModalDetails()}
            </div>
        );
    }
}

MasterDetailContainer.propTypes = {

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

export default MasterDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MasterDetailContainer);
