import React,{ useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';

import { Route } from 'react-router-dom';

import Spinner from '../../components/spinner/Spinner';

import { fetchCollectionsStart } from '../../redux/shop/ShopActions';

const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/CollectionsOverviewContainer'));
const CollectionPageContainer = lazy(() => import('../collection/CollectionPageContainer'));

const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart])

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </Suspense>
    </div>
  );
};




const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);

