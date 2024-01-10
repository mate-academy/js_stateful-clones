'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };

  const arrayOfState = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newState = {
        ...newState, ...action.extraData,
      };
      arrayOfState.push({ ...newState });
    }

    if (action.type === 'removeProperties') {
      newState = { ...newState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      arrayOfState.push({ ...newState });
    }

    if (action.type === 'clear') {
      newState = {};
      arrayOfState.push({ ...newState });
    }
  }

  return arrayOfState;
}

module.exports = transformStateWithClones;
