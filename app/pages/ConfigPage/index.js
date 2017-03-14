// @flow
import React, {Component} from 'react';
import Workbench from './Workbench';
import ProjectList from './ProjectList';
import * as ConfigActions from '../../actions/config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Config extends Component {
  render() {
    const {
      config:{workbench, projects},
      changeWorkbench,
      scanWorkbench
    } = this.props;
    return (
      <section>
        <Workbench {...{workbench, changeWorkbench, scanWorkbench}}/>
        <ProjectList {...{projects, scanWorkbench}}/>
      </section>
    );
  }
}

function mapStateToProps({config}) {
  return {
    config
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConfigActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
