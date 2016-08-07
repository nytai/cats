import { connect } from 'react-redux';
import { CatList } from '../components/catList';
import { removeCat, getCats } from '../actions/appActions';

export const CatContainer = connect(
  function mapStateToProps(state) {
    return { stateContainer: state };
  },
  function mapDispatchToProps(dispatch) {
    return {
      getCats: () => dispatch(getCats()),
      removeCat: id => dispatch(removeCat(id))
    };
  }
)(CatList);
