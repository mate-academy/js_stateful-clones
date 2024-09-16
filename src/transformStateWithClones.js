'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let arr = [];
  let clone = {...state};
  for (let obj of transforms) {

    switch (obj.operation) {
      case 'addProperties':
        clone = Object.assign(clone, obj.properties);
        break;

      case 'removeProperties':
        for (let item of obj.properties) {
          delete clone[item];
        }
        break;

      case 'clear':
        for (let element in clone) {
          delete clone[element];
        }
        break;
    }

    arr.push({...clone});
  }

  return arr;
}

module.exports = transformStateWithClones;
