'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const states = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
      states.push({ ...stateClone });
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => delete stateClone[key]);
      states.push({ ...stateClone });
    }

    if (action.type === 'clear') {
      Object.keys(stateClone).forEach((key) => delete stateClone[key]);
      states.push({});
    }
  }

  return states;
}

module.exports = transformStateWithClones;
