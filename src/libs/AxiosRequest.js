import axios from 'axios';

import { urlService, apiKey } from '../constants';

const generateUrl = (args) => {
  const { url, params } = args;
  let _url = new URL(`${urlService}/${url}`);
  _url.searchParams.set('api_key', apiKey);
  _url.searchParams.set('language', 'en-US');

  if (params) {
    const valueParams = Object.keys(params);
    for (let i = 0; i < valueParams.length; i++) {
      const key = valueParams[i];
      const value = params[key];
      _url.searchParams.set(key, value);
    }
  }
  _url = _url.toString();
  return _url;
}
/**
 * 
 * @param  {Object} args
 * @param  {String} args.method
 * @param  {String} args.url
 * @param  {Object} args.params
 * @param  {Object} args.data
 */
export default async function request(args) {
  const { method, url, data, params } = args;
  return new Promise((resolve, reject) => {

    const _url = generateUrl({ url, params });
    axios({
      headers: { "Content-Type": "multipart/form-data" },
      method,
      url: _url,
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}