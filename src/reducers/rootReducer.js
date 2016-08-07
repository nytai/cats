import {
  REQUEST_CATS,
  REMOVE_CAT,
  RECEIVE_CAT_IMAGES,
  RECEIVE_CAT_FACTS,
  RECEIVED_CATS,
  ERROR,
} from '../actions/appActions';

export default function(state= {
  isFetching: false,
  catImages: [],
  catFacts: [],
}, action) {
  switch(action.type) {
    case REQUEST_CATS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_CAT_FACTS:
      return Object.assign({}, state, {
        catFacts: action.payload,
      });
    case RECEIVE_CAT_IMAGES:
      return Object.assign({}, state, {
        isFetching: false,
        catImages: action.payload,
      });
    case RECEIVED_CATS:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case ERROR:
      return; // console.log(action.payload); // TODO: REMOVE side effect and do something with error.
    case REMOVE_CAT:
      return Object.assign({}, state, {
        catImages: state.catImages.map((c, id) => {
                    if (id === action.payload) {
                      c.isHidden = true
                      return c;
                    } else {
                      return c;
                    }
                  })
      });
    default:
      return state;
  }
}
