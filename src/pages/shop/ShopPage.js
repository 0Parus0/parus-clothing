import React,{ Component } from 'react';
import { connect } from 'react-redux';

import { Route } from 'react-router-dom';

import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer';
import CollectionPageContainer from '../collection/CollectionPageContainer';

import { fetchCollectionsStart } from '../../redux/shop/ShopActions';


class ShopPage extends Component {

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </div>
    );
  };
};



const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);

