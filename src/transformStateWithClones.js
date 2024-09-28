'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateDublicate = { ...state };
  const result = [];

  for (const action of actions) {
    const { extraData, keysToRemove } = action;

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateDublicate, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach(property => delete stateDublicate[property]);
        break;

      case 'clear':
        stateDublicate = {};

      default:
        console.log("Some unusual activity")
    }

    result.push({ ...stateDublicate });
  }

  return result;
}

module.exports = transformStateWithClones;
