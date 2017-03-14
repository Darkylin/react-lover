// @flow
import {
  CONFIG_CHANGE_WORKBENCH,
  CONFIG_CHANGE_PROJECTS,
  CONFIG_CHANGE_NEW_PROJECT,
  CONFIG_ADD_NEW_PROJECT
} from '../actions/config';
import {combineReducers} from 'redux';
import {profile} from '../profile';

function workbench(state = profile.get('config.workbench') || '', action) {
  switch (action.type) {
    case CONFIG_CHANGE_WORKBENCH:
      const data: string = action.data;
      return data;
    default:
      return state;
  }
}
function projects(state = profile.get('config.projects') || [], action) {
  switch (action.type) {
    case CONFIG_ADD_NEW_PROJECT:
      const newProjectDir: string = action.dir;
      return [...state, newProjectDir];
    case CONFIG_CHANGE_PROJECTS:
      const data: string[] = action.data;
      return [...data];
    default:
      return state;
  }
}
function newProjectInput(state = '', action) {
  switch (action.type) {
    case CONFIG_CHANGE_NEW_PROJECT:
      const data: string = action.data;
      return data;
    default:
      return state;
  }
}

export default combineReducers({workbench, projects, newProjectInput});
