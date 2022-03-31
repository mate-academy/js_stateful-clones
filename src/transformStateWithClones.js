'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resArray = []; // [4 keys, 4 keys]
  const resObject = { ...state }; // 4 key

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(resObject, actions[i].extraData);
        break;
      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete resObject[key];
        }
        break;
      case 'clear':
        for (const key in resObject) {
          delete resObject[key];
        }
        break;
    }
    resArray.push({ ...resObject });
  }

  return resArray;
}

module.exports = transformStateWithClones;
