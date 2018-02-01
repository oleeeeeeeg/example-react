import config from './../config/config.json';

export function userReposApi(data) {
    return fetch(`${config.serverURL}users/${data.user}/repos`, {
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then(response => response.json());
}
