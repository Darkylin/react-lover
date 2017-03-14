// @flow
import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class ProjectList extends Component {
  state = {showAddInput: false};

  addProject() {
    this.setState({
      showAddInput: true
    })
  }

  addProjectDone() {
    this.setState({
      showAddInput: false
    });
    const {addNewProject, newProjectInput} = this.props;
    addNewProject(newProjectInput);
  }

  changeProjectTextField({target:{value}}) {
    this.props.changeNewProject(value);
  }

  render() {
    const {projects, scanWorkbench, newProjectInput} = this.props;
    if (projects.length > 0) {
      return (
        <Card style={{marginTop:15}}>
          <CardHeader
            title="项目目录"
            style={{padding:'15px 15px 0 15px'}}
          />
          <CardText>
            {
              projects.map(p =>
                <Toggle
                  key={p}
                  label={p}
                  defaultToggled={false}
                  onChange={()=>{}}
                  style={{margin:12}}
                />
              )
            }
          </CardText>
          {this.state.showAddInput && (
            <CardText>
              <TextField
                hintText={'项目名称'}
                onChange={::this.changeProjectTextField}
                defaultValue={newProjectInput}
              />
              <FlatButton onClick={::this.addProjectDone}>新建</FlatButton>
            </CardText>
          )}
          <CardActions
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              paddingBottom: 15
            }}
          >
            <RaisedButton onClick={scanWorkbench}>刷新</RaisedButton>
            <RaisedButton onClick={::this.addProject}>添加</RaisedButton>
          </CardActions>
        </Card>
      );
    }
    return null;
  }
};
