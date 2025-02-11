'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const copyState = { ...state };

  for (const action of actions) {
    const type = action.type;

    switch (type) {
      case 'addProperties':
        addProperties(copyState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(copyState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(copyState);
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    res.push({ ...copyState });
  }

  return res;
}

function addProperties(obj, extraData) {
  Object.assign(obj, extraData);
}

function removeProperties(obj, keys) {
  keys.forEach((key) => {
    delete obj[key];
  });
}

function clearProperties(obj) {
  for (const keys in obj) {
    delete obj[keys];
  }
}

module.exports = transformStateWithClones;
