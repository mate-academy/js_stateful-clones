'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    let newState = {};

    switch (action.type) {
      case 'addProperties':
        newState = {
          ...stateCopy,
          ...action.extraData,
        };

        break;

      case 'removeProperties':
        newState = {
          ...stateCopy,
        };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }

        break;

      case 'clear':
        newState = {};
        break;

      default:
        newState = { ...stateCopy };
        break;
    }

    result.push(newState);
    stateCopy = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
