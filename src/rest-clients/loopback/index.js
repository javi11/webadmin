/*
 * Copyright (c) 2017 AXA Group Solutions.
 *
 * Licensed under the AXA Group Solutions License (the "License")
 * you may not use this file except in compliance with the License.
 * A copy of the License can be found in the LICENSE.TXT file distributed
 * together with this file.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import authClient from './authClient';
import { queryParameters, fetchJson } from './fetch';
import { GET_LIST, GET_ONE, GET_MANY, GET_MANY_REFERENCE, CREATE, UPDATE, DELETE } from './types';

/**
 * Maps admin-on-rest queries to a loopback powered REST API
 *
 * @see https://github.com/strongloop/loopback
 * @example
 * GET_LIST     => GET http://my.api.url/posts?filter[sort]="title ASC"&filter[skip]=0&filter[limit]=20
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter[where][id][inq]=123
 * UPDATE       => PATCH http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchJson) => {
  /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
  const convertRESTRequestToHTTP = (type, resource, params) => {
    const resourceLowerCase = resource && resource.toLowerCase();
    let url = '';
    const options = {};
    let query = {};
    const { page, perPage } = params && params.pagination ? params.pagination : {};
    const { field, order } = params && params.sort ? params.sort : {};

    switch (type) {
      case GET_LIST:
        query.where = { ...params.filter };
        if (field) query.order = [`${field} ${order}`];
        if (perPage > 0) {
          query.limit = perPage;
          if (page >= 0) {
            query.skip = (page - 1) * perPage;
          }
        }

        // On ask for notifications or devices we have to add this extra parameters to adapt the response to pure loopback rest
        if (resourceLowerCase.indexOf('notifications') > -1) {
          query.include = 'pushNotifications';
        }

        url = `${apiUrl}/${resourceLowerCase}?${queryParameters({
          filter: JSON.stringify(query),
          mapping: false
        })}`;
        break;

      case GET_ONE:
        // On ask for notifications we have to add this extra parameters to adapt the response to pure loopback rest
        if (resourceLowerCase.indexOf('notifications') > -1) {
          query.include = 'pushNotifications';
        }

        url = `${apiUrl}/${resourceLowerCase}/${params.id}?${queryParameters({
          filter: JSON.stringify(query)
        })}`;
        break;
      case GET_MANY:
        query = {
          where: { id: { inq: params.ids } }
        };
        url = `${apiUrl}/${resourceLowerCase}?${queryParameters({
          filter: JSON.stringify(query)
        })}`;
        break;

      case GET_MANY_REFERENCE:
        query.where = { ...params.filter };
        query.where[params.target] = params.id;
        if (field) query.order = [`${field} ${order}`];
        if (perPage > 0) {
          query.limit = perPage;
          if (page >= 0) {
            query.skip = (page - 1) * perPage;
          }
        }
        url = `${apiUrl}/${resourceLowerCase}?${queryParameters({
          filter: JSON.stringify(query)
        })}`;
        break;

      case UPDATE:
        url = `${apiUrl}/${resourceLowerCase}/${params.id}`;
        options.method = 'PATCH';
        options.body = JSON.stringify(params.data);
        break;
      case CREATE:
        url = `${apiUrl}/${resourceLowerCase}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        url = `${apiUrl}/${resourceLowerCase}/${params.id}`;
        options.method = 'DELETE';
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
  const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { headers, json } = response;
    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        if (!headers.has('x-total-count')) {
          throw new Error(
            'The X-Total-Count header is missing in the HTTP Response. The jsonServer REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
          );
        }
        return {
          data: json,
          total: parseInt(headers.get('x-total-count').split('/').pop(), 10)
        };
      case CREATE:
        return { data: { request: { ...params.data }, id: json.id || 'response', body: json } };
      default:
        return { data: json };
    }
  };

  /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
  return (type, resource, params) => {
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    return httpClient(url, options).then(response =>
      convertHTTPResponseToREST(response, type, resource, params)
    );
  };
};

export { authClient };
