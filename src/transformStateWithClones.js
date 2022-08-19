'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const clone = Object.assign({}, state);

  for (const action in actions) {
    const actionType = actions[action].type;
    const removeArr = actions[action].keysToRemove;
    const extraData = actions[action].extraData;

    if (actionType === 'addProperties') {
      Object.assign(clone, extraData);
    } else if (actionType === 'removeProperties') {
      for (const removeProp of removeArr) {
        delete clone[removeProp];
      }
    } else if (actionType === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }
    resultArr.push({ ...clone });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
