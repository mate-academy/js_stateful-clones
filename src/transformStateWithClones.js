'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  const robot = { ...state };
  let index = 0;

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(robot, obj.extraData);
      arr[index] = { ...robot };
      index++;
    } else if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        // if (robot.hasOwnProperty(key)) {
        //   delete robot[key];
        // }
        delete robot[key];
      }
      arr[index] = { ...robot };
      index++;
    } else if (obj.type === 'clear') {
      for (const key in robot) {
        delete robot[key];
      }
      arr[index] = { ...robot };
      index++;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
