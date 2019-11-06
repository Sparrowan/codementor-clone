const localhost = 'http://127.0.01:8000';

const apiUrl = '/api/';

export const endpoint = localhost + apiUrl;

export const registerUrl = endpoint + 'accounts/rest-auth/registration/';

export const loginUrl = endpoint + 'accounts/rest-auth/login/';

export const userUrl = endpoint + 'accounts/user/';

export const profileUrl = id => `${endpoint}accounts/profile/${id}`;

export const freelancerListUrl = endpoint + 'accounts/freelancers/';

export const becomeFreelancerUrl = endpoint + 'accounts/become-freelancer/';

export const unbecomeFreelancerUrl = endpoint + 'accounts/unbecome-freelancer/';

export const jobListCreateUrl = endpoint + 'jobs/';

export const jobDetailEditDeleteUrl = id => `${endpoint}jobs/${id}`;
