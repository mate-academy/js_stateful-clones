'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const results = [];

  for (const action of actions) {
    let stateCopy;

    if (!results.length) {
      stateCopy = { ...state };
    } else {
      stateCopy = { ...results[results.length - 1] };
    }

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          delete stateCopy[keyRemove];
        }
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      default:
        break;
    }
    results.push(stateCopy);
  }

  return results;
}

module.exports = transformStateWithClones;
