'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCondition = [];
  let stateCopy = { ...state };

  for (const curentAction of actions) {
    switch (curentAction.type) {
      case 'addProperties':
        Object.assign(stateCopy, curentAction.extraData);

        break;

      case 'removeProperties':

        for (const key of curentAction.keysToRemove) {
          delete stateCopy[key];
        }

        break;

      case 'clear':

        stateCopy = {};

        break;

      default:
        throw new Error('Unknown action type. Try again.');
    }

    stateCondition.push({ ...stateCopy });
  }

  return stateCondition;
}

module.exports = transformStateWithClones;
