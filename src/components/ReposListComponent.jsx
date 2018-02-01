import React, { Component } from 'react';
import classNames from 'classnames';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import SortField from '../constants/SortField';
import SortOrder from '../constants/SortOrder';

export default class ReposListComponent extends Component {
    onPageClick(id) {
        this.props.onPageClick(id);
    }

    onModalClick(id) {
        this.props.onModalClick(id);
    }

    onPaginationClick(number) {
        this.props.onPaginationClick(number);
    }

    getSortedRepos(repos, sortField, sortOrder) {
        if (sortField === SortField.NAME) {
            return this.sortByStringParam(repos, sortField, sortOrder);
        }
        return this.sortByNumberParam(repos, sortField, sortOrder);
    }

    sortByNumberParam(repos, sortField, sortOrder) {
        if (sortOrder === SortOrder.ASCENDING) {
            return repos.sort((a, b) => a[sortField] - b[sortField]);
        } else if (sortOrder === SortOrder.DESCENDING) {
            return repos.sort((a, b) => b[sortField] - a[sortField]);
        }
    }


    sortByStringParam(repos, sortField, sortOrder) {
        if (sortOrder === SortOrder.ASCENDING) {
            return repos.sort((a, b) => a[sortField].localeCompare(b[sortField]));
        } else if (sortOrder === SortOrder.DESCENDING) {
            return repos.sort((a, b) => b[sortField].localeCompare(a[sortField]));
        }
    }

    getFilteredRepos(repos, filters) {
        let filteredRepos = repos;
        for (let i = 0; i < filters.length; i++) {
            if (filters.value === '') {
                continue;
            }
            filteredRepos = filteredRepos.filter(repo => repo[filters[i].field].toString().toLowerCase().includes(
                filters[i].value.toString().toLowerCase()
            ));
        }
        return filteredRepos;
    }

    renderRepoItem(repo, index) {
        return (
            <Row key={index} className="repos-list-item">
                <Col xs={2} sm={2} className="repos-list-item-col repos-list-item-name">
                    {repo.name}
                </Col>
                <Col xs={2} sm={2} className="repos-list-item-col repos-list-item-id">
                    {repo.id}
                </Col>
                <Col xs={2} sm={2} className="repos-list-item-col repos-list-item-stars">
                    {repo.stargazers_count}
                </Col>
                <Col xs={2} sm={2} className="repos-list-item-col repos-list-item-forks">
                    {repo.forks_count}
                </Col>
                <Col xs={2} sm={2} className="repos-list-item-col repos-list-item-watchers">
                    {repo.watchers_count}
                </Col>
                <Col
                    className="repos-list-item-col repos-list-item-action-modal"
                    xs={1}
                    sm={1}
                    onClick={this.onModalClick.bind(this, repo.id)}
                >
                    <Glyphicon glyph="modal-window" />
                </Col>
                <div
                    className="repos-list-item-col repos-list-item-action-page"
                    xs={1}
                    sm={1}
                    onClick={this.onPageClick.bind(this, repo.id)}
                >
                    <Glyphicon glyph="new-window" />
                </div>
            </Row>
        );
    }

    renderNoItems() {
        return (
            <div>
			    Nothing to show
            </div>
	    );
    }

    renderPagination(pageCount, pageNumber) {
        let pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push({
                number: i,
                isCurrent: i === pageNumber,
            });
        }
        return (
            <div className="repos-list-pagination">
                {pages.map(this.renderPaginationElement.bind(this))}
            </div>
        )
    }

    renderPaginationElement(page) {
        return (
            <Col
                className={classNames('repos-list-pagination-element', {current: page.isCurrent})}
                xs={1}
                key={page.number}
                onClick={this.onPaginationClick.bind(this, page.number)}
            >
                {page.number}
            </Col>
        );
    }

    render() {
        const { repos, sortField, sortOrder, filters, itemsOnPage, pageNumber } = this.props;

        if (repos.length === 0) {
        	return this.renderNoItems();
        }

        const sortedRepos = this.getSortedRepos(repos, sortField, sortOrder);
        const filteredRepos = this.getFilteredRepos(sortedRepos, filters);
        const pageCount = Math.ceil(filteredRepos.length / itemsOnPage);
        const reposOnPage = filteredRepos.slice((pageNumber - 1) * itemsOnPage, pageNumber * itemsOnPage);

        return (
            <div className="repos-list-component">
                {reposOnPage.map(this.renderRepoItem.bind(this))}
                {this.renderPagination(pageCount, pageNumber)}
            </div>
        );
    }
}
