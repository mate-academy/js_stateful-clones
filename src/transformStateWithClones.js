'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyResults = [];
  const copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        addProperties(copyState, extraData);
        break;

      case 'removeProperties':
        removeProperties(copyState, keysToRemove);
        break;

      case 'clear':
        removeProperties(copyState, Object.keys(copyState));
        break;

      default:
        throw new Error(`The action type ${action.type} is invalid`);
    }
    copyResults.push({ ...copyState });
  }

  return copyResults;
}

function addProperties(object, extraData) {
  Object.assign(object, extraData);
}

function removeProperties(object, keys) {
  for (const key of keys) {
    delete object[key];
  }
}
module.exports = transformStateWithClones;
