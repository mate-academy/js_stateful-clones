'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const action of actions) {
    let stateCopy = null;

    if (result.length === 0) {
      stateCopy = { ...state };
    } else {
      stateCopy = { ...result[result.length - 1] };
    }

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
    }

    result.push(stateCopy);
  }

  return result;
}

module.exports = transformStateWithClones;
