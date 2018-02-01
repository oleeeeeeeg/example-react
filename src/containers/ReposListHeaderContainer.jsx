import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FormControl, Grid, Row, Col } from 'react-bootstrap';

import * as Actions from './../actions/index';
import SortField from '../constants/SortField';

class ReposListHeaderContainer extends Component {
    constructor() {
        super();
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleStarsChange = this.handleStarsChange.bind(this);
        this.handleForksChange = this.handleForksChange.bind(this);
        this.handleWatchersChange = this.handleWatchersChange.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value;
        const { changeFilter } = this.props.actions;
        changeFilter({
            field: SortField.NAME,
            value,
        });
    }

    handleIdChange(event) {
        const value = event.target.value;
        const { changeFilter } = this.props.actions;
        changeFilter({
            field: SortField.ID,
            value,
        });
    }

    handleStarsChange(event) {
        const value = event.target.value;
        const { changeFilter } = this.props.actions;
        changeFilter({
            field: SortField.STARS,
            value,
        });
    }

    handleForksChange(event) {
        const value = event.target.value;
        const { changeFilter } = this.props.actions;
        changeFilter({
            field: SortField.FORKS,
            value,
        });
    }

    handleWatchersChange(event) {
        const value = event.target.value;
        const { changeFilter } = this.props.actions;
        changeFilter({
            field: SortField.WATCHERS,
            value,
        });
    }

    handleToggleSorting(sortData) {
        const { changeSortField, changeSortOrder } = this.props.actions;
        const { sortField } = this.props.state.appState;
        if (sortData.field === sortField) {
            changeSortOrder();
        } else {
            changeSortField(sortData.field);
        }
    }

    renderHeaders() {
        return (
            <Row className="repos-list-header-container-headers">
                <Col
                    className="headers-item header-name"
                    xs={2}
                    sm={2}
                    onClick={this.handleToggleSorting.bind(this, {
                        field: SortField.NAME,
                    })}
                >
                    Name
                </Col>
                <Col
                    className="headers-item header-id"
                    xs={2}
                    sm={2}
                    onClick={this.handleToggleSorting.bind(this, {
                        field: SortField.ID,
                    })}
                >
                    Id
                </Col>
                <Col
                    className="headers-item header-stars"
                    xs={2}
                    sm={2}
                    onClick={this.handleToggleSorting.bind(this, {
                        field: SortField.STARS,
                    })}
                >
                    Stars
                </Col>
                <Col
                    className="headers-item header-forks"
                    xs={2}
                    sm={2}
                    onClick={this.handleToggleSorting.bind(this, {
                        field: SortField.FORKS,
                    })}
                >
                    Forks
                </Col>
                <Col

                    className="headers-item header-watchers"
                    xs={2}
                    sm={2}
                    onClick={this.handleToggleSorting.bind(this, {
                        field: SortField.WATCHERS,
                    })}
                >
                    Watchers
                </Col>
            </Row>
        );
    }

    renderFilters() {
        const { filters } = this.props.state.appState;
        const name = filters.find(filter => filter.field === SortField.NAME).value;
        const id = filters.find(filter => filter.field === SortField.ID).value;
        const stars = filters.find(filter => filter.field === SortField.STARS).value;
        const forks = filters.find(filter => filter.field === SortField.FORKS).value;
        const watchers = filters.find(filter => filter.field === SortField.WATCHERS).value;

        return (
            <Row className="repos-list-header-container-filters">
                <Col xs={12} sm={2}>
                    <FormControl
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={this.handleNameChange}
                    />
                </Col>
                <Col xs={12} sm={2}>
                    <FormControl
                        type="text"
                        value={id}
                        placeholder="Id"
                        onChange={this.handleIdChange}
                    />
                </Col>
                <Col xs={12} sm={2}>
                    <FormControl
                        type="text"
                        value={stars}
                        placeholder="Stars"
                        onChange={this.handleStarsChange}
                    />
                </Col>
                <Col xs={12} sm={2}>
                    <FormControl
                        type="text"
                        value={forks}
                        placeholder="Forks"
                        onChange={this.handleForksChange}
                    />
                </Col>
                <Col xs={12} sm={2}>
                    <FormControl
                        type="text"
                        value={watchers}
                        placeholder="Watchers"
                        onChange={this.handleWatchersChange}
                    />
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <div className="repos-list-header-container">
                {this.renderHeaders()}
                {this.renderFilters()}
            </div>
        );
    }
}


ReposListHeaderContainer.propTypes = {

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

export default ReposListHeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReposListHeaderContainer);
