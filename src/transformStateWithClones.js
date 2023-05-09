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

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        const { extraData } = object;

        Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        const { keysToRemove } = object;

        removeProperties(copyState, keysToRemove);
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        break;
    }

    versionsOfState.push({ ...copyState });
  }

  return versionsOfState;

  function removeProperties(object, propertiesToRemove) {
    for (const property of propertiesToRemove) {
      delete object[property];
    }
  }
}

module.exports = transformStateWithClones;
