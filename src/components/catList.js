import '../styles/main.scss';
import React, { Component } from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const Cat = (props) => {
  const { id, fact, image, isHidden, byeSelf } = props;
  let item;
    if(!isHidden) {
      item = (
        <li key={id}
          className="cat-item">
          <img src={image.url} className="cat-image"/>
          <p className="cat-fact"> {fact} </p>
          <a className="delete-cat" href="#" onClick={byeSelf(id)}> Bye </a>
        </li>
      );
  }

    return(
      <ReactCSSTransitionGroup
        key={id}
        transitionName="cat"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        {item}
      </ReactCSSTransitionGroup>
    );

}

export class CatList extends Component {

  componentDidMount() {
     const { getCats } = this.props
     getCats();
  }

  render(){
    const { stateContainer, removeCat, getCats } = this.props;

    const byeCat = id => e => {
      e.preventDefault();
      return removeCat(id);
    }

    const getMoreCats = e => {
      e.preventDefault();
      return getCats();
    }

    const killedAll = stateContainer.catImages.every( (e) => e.isHidden );

    if (stateContainer.isFetching) {
      return (
        <div className="cats">
          <p className="loading"> Loading... </p>
        </div>
      )
    }

    if (killedAll) {
      return (
        <div className="cats">
          <div className="vertical-padd"> </div>
          <a className="more-cats" href="#" onClick={getMoreCats}>Gimme More</a>
        </div>
      );
    }

    return (
      <div className="cats">
        <ul className="cat-list">
          {
            stateContainer.catImages.map( (e, i) => (
              <Cat key={i} byeSelf={byeCat} id={i} image={e} isHidden={e.isHidden} fact={stateContainer.catFacts[i]} />
            ) )
          }
        </ul>
      </div>
    );
  }
}
