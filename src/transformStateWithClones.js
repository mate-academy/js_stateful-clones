'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const versionsArray = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(stateClone, actions[i].extraData);
      versionsArray.push(Object.assign({}, stateClone));
    }

    if (actions[i].type === 'removeProperties') {
      (actions[i].keysToRemove).map(key => delete stateClone[key]);
      versionsArray.push(Object.assign({}, stateClone));
    }

    if (actions[i].type === 'clear') {
      Object.keys(stateClone).map(key => delete stateClone[key]);
      versionsArray.push(Object.assign({}, stateClone));
    }
  }

  return versionsArray;
}

module.exports = transformStateWithClones;
