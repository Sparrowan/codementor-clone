const localhost = 'http://127.0.01:8000';

const apiUrl = '/api/';

export const endpoint = localhost + apiUrl;

export const registerUrl = endpoint + 'accounts/user/';

export const loginUrl = endpoint + 'accounts/rest-auth/login/';

// export const projectListCreateUrl = endpoint + 'projects/';

export const projectListCreateUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

// export const projectDetailUrl = id => `${endpoint}projects/${id}`;

export const projectDetailUrl = id => `https://jsonplaceholder.typicode.com/posts/${id}`;
