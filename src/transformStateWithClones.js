'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const versionsOfState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const { extraData } = action;

        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        removeProperties(stateCopy, keysToRemove);
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw Error(`unknown actions type ${action.type}`);
    }

    versionsOfState.push({ ...stateCopy });
  }

  return versionsOfState;
}

function removeProperties(object, propertiesToRemove) {
  for (const property of propertiesToRemove) {
    delete object[property];
  }
}

module.exports = transformStateWithClones;
