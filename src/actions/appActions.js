import { parseString } from 'xml2js'

export const REQUEST_CATS = 'REQUEST_CATS';
export const REMOVE_CAT = 'REMOVE_CAT';
export const RECEIVE_CAT_IMAGES = 'RECEIVE_CAT_IMAGES';
export const RECEIVE_CAT_FACTS = 'RECEIVE_CAT_FACTS';
export const RECEIVED_CATS = 'RECEIVED_CATS';
export const ERROR = 'ERROR';

const CATS_IMAGE_URL = 'http://mapd-cats.azurewebsites.net/catpics';
const CATS_QUOTES_URL = 'http://mapd-cats.azurewebsites.net/catfacts';

export function removeCat(id) {
  return {
    type: 'REMOVE_CAT',
    payload: id
  }
}

export function getCats() {
  return dispatch =>{
    dispatch(requestCats());
    return Promise.all([
      dispatch(fetchCatImages()),
      dispatch(fetchCatFacts())
    ]).then(() => dispatch(finishCats()));
  }
}

function requestCats() {
  return {
    type: REQUEST_CATS
  }
}

function finishCats() {
  return {
    type: RECEIVED_CATS
  }
}

function receiveCatFacts(cats) {
  return {
    type: RECEIVE_CAT_FACTS,
    payload: cats.facts,
  }
}
function receiveCatImages(cats) {
  return {
    type: RECEIVE_CAT_IMAGES,
    payload: cats,
  }
}

function errorHandler(err) {
  return {
    type: ERROR,
    payload: err,
  }
}

function fetchCatFacts() {
  return dispatch =>
    fetch(
      CATS_QUOTES_URL
    ).then(
      response => response.json()
    ).then(
      json => dispatch(receiveCatFacts(json)),
      err => dispatch(errorHandler(err))
    );
}

function fetchCatImages() {
  return dispatch =>
    fetch(
      CATS_IMAGE_URL
    ).then(
      response => response.text()
    ).then(
      xml => {
        return parseString(xml, function (err, result) {
          if (err) {
            return errorHandler(err);
          }
          return dispatch(receiveCatImages(result.response.data[0].images[0].image))
        });
      },
      err => dispatch(errorHandler(err))
    );
}
