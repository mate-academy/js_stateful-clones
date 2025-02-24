'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesAfterActions = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        for (const key in extraData) {
          stateCopy = { ...stateCopy };
          stateCopy[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          stateCopy = { ...stateCopy };
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    statesAfterActions.push(Object.assign({}, stateCopy));
  }

  return statesAfterActions;
}

module.exports = transformStateWithClones;
