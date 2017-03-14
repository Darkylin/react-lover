// @flow
import {profile} from '../profile';
import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';

import findAllProjects from './logic/findAllProjects';

export const CONFIG_CHANGE_WORKBENCH = 'CONFIG_CHANGE_WORKBENCH';
export const CONFIG_CHANGE_PROJECTS = 'CONFIG_CHANGE_PROJECTS';
export const CONFIG_CHANGE_NEW_PROJECT = 'CONFIG_CHANGE_NEW_PROJECT';
export const CONFIG_ADD_NEW_PROJECT = 'CONFIG_ADD_NEW_PROJECT';

function simpleDataActionCreator(actionType = 'UNKNOWN') {
  return data => ({
    type: actionType, data
  });
}

export const changeWorkbench = simpleDataActionCreator(CONFIG_CHANGE_WORKBENCH);
export const changeNewProject = simpleDataActionCreator(CONFIG_CHANGE_NEW_PROJECT);

export function scanWorkbench() {
  return (dispatch, getState) => {
    const {config:{workbench}} = getState();
    // 保存生效, 否则只存在于内存
    profile.set('config.workbench', workbench);
    fse.ensureDirSync(workbench);
    findAllProjects(workbench, 3, (err, data) => {
      err && console.log(err);
      dispatch({type: CONFIG_CHANGE_PROJECTS, data});
      profile.set('config.projects', data);
    });
  };
}


export function addNewProject(dirname) {
  return (dispatch, getState) => {
    const {config:{workbench, projects}} = getState();
    const dir = path.join(workbench, dirname);
    if (!projects.find(p => p === dir)) {
      fs.mkdir(dir, err => {
        if(err){
          return alert(err);
        }
        dispatch(scanWorkbench);
      });
    } else {
      alert(dir + ' 已经存在');
    }

  }
}