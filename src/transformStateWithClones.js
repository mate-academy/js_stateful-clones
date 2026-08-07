'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arrState = [];

  for (const action of actions) {
    const { type } = action;

    newState = { ...newState };

    if (type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
      arrState.push(newState);
    }

    if (type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      arrState.push(newState);
    }

    if (type === 'addProperties') {
      for (const [key, value] of Object.entries(action.extraData)) {
        newState[key] = value;
      }
      arrState.push(newState);
    }
  }

  return arrState;
}

module.exports = transformStateWithClones;
