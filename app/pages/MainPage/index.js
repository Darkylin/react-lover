// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './main.css';

import NavBar from './NavBar';

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <main className={styles.app}>
        <NavBar/>
        <section className={styles.appMain}>
          {this.props.children}
        </section>
      </main>
    );
  }
}
