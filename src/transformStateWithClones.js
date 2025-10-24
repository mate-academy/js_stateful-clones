'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultAllActions = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...extraData };
        break;
      case 'removeProperties':
        for (const element of keysToRemove) {
          delete stateCopy[element];
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        throw new Error(`Invalid action type: ${type}`);
    }
    resultAllActions.push({ ...stateCopy });
  }

  return resultAllActions;
}

module.exports = transformStateWithClones;
