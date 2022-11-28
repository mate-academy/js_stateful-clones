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
  const newObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraData);
        break;

      case 'clear':
        for (const all in newObj) {
          delete newObj[all];
        }
        break;

      case 'removeProperties':
        for (const dele of action.keysToRemove) {
          delete newObj[dele];
        }
        break;
    }

    arr.push({ ...newObj });
  }

  return arr;
}

module.exports = transformStateWithClones;
