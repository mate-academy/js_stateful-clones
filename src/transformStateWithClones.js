'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObj = { ...state };
  const resArr = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newObj = Object.assign(newObj, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const i of action.keysToRemove) {
        delete newObj[i];
      }
    }

    if (action.type === 'clear') {
      for (const i in newObj) {
        delete newObj[i];
      }
    }
    resArr.push({ ...newObj });
  }

  return resArr;
}

module.exports = transformStateWithClones;
