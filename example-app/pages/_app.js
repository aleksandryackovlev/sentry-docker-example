import React from 'react';
import App from 'next/app';

import { initSentry } from '../utils/sentry';

initSentry();

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    const { err } = this.props;
    const modifiedPageProps = { ...pageProps, err };

    return <Component {...modifiedPageProps} />;
  }
}

export default MyApp;
