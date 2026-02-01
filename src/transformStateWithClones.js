'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prewState = { ...state };
  const result = [];

  for (const action of actions) {
    let newState = { ...prewState}

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          const value = action.extraData[key];

          newState[key] = value;
        }
        break;

      case 'removeProperties':
        for (const keyDelete of action.keysToRemove) {
          delete newState[keyDelete];
        }

        break;

      case 'clear':
        newState = {};
        break;

      default:
    }

    prewState = newState;
    result.push(newState);
  }

  return result;
}

module.exports = transformStateWithClones;
