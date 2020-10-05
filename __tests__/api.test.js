import {fetchContacts} from '../src/api/index';
import axios from 'axios'
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
beforeEach(() => {
  fetch.resetMocks();
});

it('returns result', async () => {
  global.fetch = jest.fn().mockImplementation(() => {
    let p = new Promise((resolve, reject) => {
      resolve({
        json: function () {
          return {};
        },
      });
    });
    return p
  });
const response = await fetchContacts()
expect(typeof response).toEqual("object")
});
