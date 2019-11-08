import React from 'react';

import Directory from '../../components/directory/Directory';

// import './HomePage.scss';

import { HomePageContainer } from './HomePage.styles';

export default function HomePage() {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  )
}
