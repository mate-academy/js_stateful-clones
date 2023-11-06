'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneOfStates = [];
  const cloneState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(cloneState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete cloneState[key];
      }

      Object.assign(cloneState);
    }

    if (action.type === 'clear') {
      for (const key of Object.keys(cloneState)) {
        delete cloneState[key];
      }

      Object.assign(cloneState);
    }

    cloneOfStates.push(Object.assign({}, cloneState));
  }

  return cloneOfStates;
}

module.exports = transformStateWithClones;
