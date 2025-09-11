'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arrWithStates = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
      arrWithStates.push(newState);
    }

    if (action.type === 'removeProperties') {
      newState = { ...newState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      arrWithStates.push(newState);
    }

    if (action.type === 'clear') {
      newState = {};
      arrWithStates.push(newState);
    }
  }

  return arrWithStates;
}

module.exports = transformStateWithClones;
