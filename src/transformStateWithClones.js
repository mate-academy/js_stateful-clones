'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const states = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          newState[key] = extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
      default:
        throw new Error('Type is not right');
    }

    states.push(Object.assign({}, newState));
  }

  return states;
}

module.exports = transformStateWithClones;
