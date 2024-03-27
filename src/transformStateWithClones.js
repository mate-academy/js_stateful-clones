'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateResults = [];
  let index = 0;
  let copyState;

  for (const action of actions) {
    if (index === 0) {
      copyState = { ...state };
    } else {
      copyState = { ...stateResults[index - 1] };
    }
    index++;

    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;
      case 'removeProperties':
        copyState = deleteProperties(copyState, action.keysToRemove);
        break;
      case 'clear':
        copyState = deleteProperties(copyState, Object.keys(copyState));
        break;
      default:
        return null;
    }
    stateResults.push(copyState);
  }

  return stateResults;
}

function deleteProperties(object, keys) {
  for (const key of keys) {
    delete object[key];
  }

  return object;
}

module.exports = transformStateWithClones;
