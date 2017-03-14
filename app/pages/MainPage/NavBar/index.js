// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './navbar.css';

export default class NavBar extends Component {
  // props: {
  //   children: HTMLElement
  // };

  render() {
    return (
      <nav className={styles.appNav}>
        <div className={styles.logoCtn}>
          <span className={styles.logo}/>
        </div>
        <Link className={styles.link} to="/config" activeClassName="active">配置</Link>
      </nav>
    );
  }
}
