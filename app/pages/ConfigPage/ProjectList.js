// @flow
import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';


export default class ProjectList extends Component {

  render() {
    const {projects, scanWorkbench} = this.props;
    if (projects.length > 0) {
      return (
        <Card style={{marginTop:15}}>
          <CardHeader
            title="项目目录"
            style={{padding:'15px 15px 0 15px'}}
          />
          <CardText>
            {projects.map(p => <div>{p}</div>)}
          </CardText>
          <CardActions
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              paddingBottom: 15
            }}
          >
            <RaisedButton onClick={scanWorkbench}>刷新</RaisedButton>
          </CardActions>
        </Card>
      );
    }
    return null;
  }
};
