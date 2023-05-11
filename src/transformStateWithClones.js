'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const versionsOfState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const { extraData } = action;

        Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        removeProperties(copyState, keysToRemove);
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        throw Error('unknown actions type');
    }

    versionsOfState.push({ ...copyState });
  }

  return versionsOfState;
}

function removeProperties(object, propertiesToRemove) {
  for (const property of propertiesToRemove) {
    delete object[property];
  }
}

module.exports = transformStateWithClones;
