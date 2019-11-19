import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollectionsForPreview } from '../../redux/shop/ShopSelectors';


import  CollectionPreview  from '../collection-preview/CollectionPreview';

import { CollectionsOverviewContainer } from './CollectionOverview.styles';

const CollectionsOverview = ({ collections }) => {
  return (
    <CollectionsOverviewContainer>
    {
      collections.map(({id, ...otherCollectionProps}) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))
    }
    </CollectionsOverviewContainer>
  )
}


const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
})


export default connect(mapStateToProps)(CollectionsOverview)
