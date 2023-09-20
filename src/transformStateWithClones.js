'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let temporalState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          for (const key in action.extraData) {
            temporalState[key] = action.extraData[key];
          }
        }
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          for (const key of action.keysToRemove) {
            delete temporalState[key];
          }
        }
        break;

      case 'clear':
        temporalState = {};
        break;
    }
    result.push(temporalState);

    currentState = temporalState;
  }

  return result;
}

module.exports = transformStateWithClones;
