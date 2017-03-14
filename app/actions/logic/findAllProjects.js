import fs from 'fs';
import fse from 'fs-extra';

// 以点开头的目录或 node_modules
const DIR_EXCEPT = /\/(node_modules|\..+)$/;
// 1. 是文件夹
// 2. path 中没有 node_modules
// 3. 包含 package.json
// 4. package.json 中有 符合条件的配置项
// 5. 从 workbench 算起，最多遍历 3 层
export default function findAllProjects(dir, depth = 3, done) {
  let results = [];
  fs.readdir(dir, function (err, list) {
    if (err) {
      return done(err);
    }
    // 如果到了最大遍历深度 结束遍历。 
    if (depth <= 0) {
      return done(null, results);
    }
    let i = 0;
    (function next() {
      let file = list[i++];
      // 结束
      if (!file) {
        return done(null, results);
      }
      file = dir + '/' + file;
      if (!DIR_EXCEPT.test(file)) {
        fs.stat(file, function (err, stat) {
          // console.log(file)
          if (stat && stat.isDirectory()) {
            // 符合项目目录条件
            if (isProjectDir(file)) {
              results.push(file);
              next();
            } else {
              // 其余目录
              findAllProjects(file, depth - 1, function (err, res) {
                results = results.concat(res);
                next();
              });
            }
          } else {
            next();
          }
        });
      } else {
        next();
      }
    })();
  });
}
function isProjectDir(dir) {
  try {
    const pkg = fse.readJsonSync(dir + '/package.json', {throws: false});
    return pkg && pkg.just;
  } catch (e) {
    return false;
  }

}