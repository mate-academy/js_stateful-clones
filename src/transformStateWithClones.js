'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let cloneAction = { ...state };
  const resultArr = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(cloneAction, obj.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of obj.keysToRemove) {
          delete cloneAction[removeKey];
        }
        break;

      case 'clear':
        cloneAction = {};
        break;
    }
    resultArr.push({ ...cloneAction });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
