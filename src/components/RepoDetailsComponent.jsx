import React, { Component } from 'react';

import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';


export default class RepoDetailsComponent extends Component {
    render() {
        const {
            repoId, repoName, repoStars, repoForks, repoWatchers,
        } = this.props;

        return (
            <Panel className="repos-details-component">
                <Panel.Heading className="repo-detail-name">
                    {repoName}
                </Panel.Heading>
                <ListGroup>
                    <ListGroupItem className="repo-detail-id">
                        {`id: ${repoId}`}
                    </ListGroupItem>
                    <ListGroupItem className="repo-detail-stars">
                        {`Stars: ${repoStars}`}
                    </ListGroupItem>
                    <ListGroupItem className="repo-detail-forks">
                        {`Forks: ${repoForks}`}
                    </ListGroupItem>
                    <ListGroupItem className="repo-detail-watchers">
                        {`Wathchers: ${repoWatchers}`}
                    </ListGroupItem>
                </ListGroup>
            </Panel>
        );
    }
}
