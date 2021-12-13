'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clone = { ...state };
  const arrClone = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(clone, obj.extraData);

      const tempCLone = { ...clone };

      arrClone.push(tempCLone);
    } else if (obj.type === 'removeProperties') {
      for (const delKey of obj.keysToRemove) {
        delete clone[delKey];
      }

      const tempCLone = { ...clone };

      arrClone.push(tempCLone);
    } else if (obj.type === 'clear') {
      for (const x in clone) {
        delete clone[x];
      }

      const tempCLone = { ...clone };

      arrClone.push(tempCLone);
    }
  }

  return arrClone;
}

module.exports = transformStateWithClones;
