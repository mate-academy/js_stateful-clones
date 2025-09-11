'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const arrWithStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (
          !action.extraData ||
          typeof action.extraData !== 'object' ||
          Array.isArray(action.extraData)
        ) {
          throw new Error('Invalid extraData for addProperties');
        }
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        stateCopy = { ...stateCopy };

        if (!Array.isArray(action.keysToRemove)) {
          throw new Error('Invalid keysToRemove for removeProperties');
        }

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error('Unknown action type: ...');
    }
    arrWithStates.push({ ...stateCopy });
  }

  return arrWithStates;
}

module.exports = transformStateWithClones;
