'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const arrayWithStates = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateClone[key];
      }
    } else {
      stateClone = {};
    }

    arrayWithStates.push({ ...stateClone });
  }

  return arrayWithStates;
}

module.exports = transformStateWithClones;
