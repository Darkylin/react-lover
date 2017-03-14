// @flow
import {profile} from '../profile';
import fs from 'fs';

export const CONFIG_CHANGE_WORKBENCH = 'CONFIG_CHANGE_WORKBENCH';
export const CONFIG_CHANGE_PROJECTS = 'CONFIG_CHANGE_PROJECTS';

export function changeWorkbench(data) {
  return {
    type: CONFIG_CHANGE_WORKBENCH,
    data
  };
}

// 1. 是文件夹
// 2. path 中没有 node_modules
// 3. 包含 package.json
// 4. package.json 中有 符合条件的配置项
// 5. 从 workbench 算起，最多遍历 3 层
function findAllProjects(dir, depth = 3, done){
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          findAllProjects(file, depth-1, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
}
export function scanWorkbench() {
  return (dispatch, getState) => {
    const {config:{workbench}} = getState();
    // 保存生效, 否则只存在于内存
    profile.set('config.workbench', workbench);
    findAllProjects(workbench,3,(err, data)=>{
      dispatch({type: CONFIG_CHANGE_PROJECTS, data})
    });
    // profile.set('config.projects', data);

  };
}
