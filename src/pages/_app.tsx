import React from 'react';
import App from 'next/app';
import './app.css';
import { Layout } from '../components/Layout';
import { SideBar } from '../components/SideBar';
import { TopBar } from '../components/TopBar';

export default class Application extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout topBar={<TopBar />} sideBar={<SideBar />}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
