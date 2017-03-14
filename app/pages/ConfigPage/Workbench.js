// @flow
import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

const {remote, clipboard} = require('electron');
const {dialog} = remote;

export default class Workbench extends Component {

  selectFileHandler() {
    dialog.showOpenDialog({properties: ['openDirectory']}, filename => {
      if (filename) {
        this.props.changeWorkbench(filename.toString());
      }
    });
  }

  changeWorkbenchHandler({target:{value}}) {
    this.props.changeWorkbench(value);
  }

  render() {
    const {workbench, scanWorkbench} = this.props;
    return (
      <Card>
        <CardHeader
          title="工作目录"
          subtitle="项目目录的父目录。"
          style={{padding:'15px 15px 0 15px'}}
        />
        <CardText style={{padding:'0 15px'}}>
          <TextField
            hintText={'请使用绝对路径'}
            onChange={::this.changeWorkbenchHandler}
            defaultValue={workbench}
            fullWidth
          />
        </CardText>

        <CardActions
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            paddingBottom: 15
          }}
        >
          <RaisedButton onClick={scanWorkbench}>保存</RaisedButton>
          <RaisedButton onClick={::this.selectFileHandler}>选择目录</RaisedButton>
        </CardActions>
      </Card>
    );
  }
}
