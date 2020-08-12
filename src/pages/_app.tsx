import * as React from 'react';
import App from 'next/app';
import './app.css';

export default class Application extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
