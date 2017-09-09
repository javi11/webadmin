import loopbackRestClient from './rest-clients/loopback/index';
import config from './config';

export const restClient = loopbackRestClient(`${config.API_HOST}${config.API_PATH}`);
