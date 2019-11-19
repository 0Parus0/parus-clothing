import React, { Component } from 'react';

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './ErrorBoundary.styles';

export default class ErrorBoundary extends Component {

  state = {
    hasErrored: false
  }

  static getDerivedStateFromError(error) {

    return { hasErrored: true}
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if(this.state.hasErrored)
    {return (
      <ErrorImageOverlay>
        <ErrorImageContainer imageUrl= 'https://i.imgur.com/yW2W9SC.png'/>
        <ErrorImageText> Sorry This Page Is Broken</ErrorImageText>
      </ErrorImageOverlay>
    )}
    return this.props.children;
  }
}
