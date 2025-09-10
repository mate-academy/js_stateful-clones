'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateClone = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        stateClone = clear();
        break;
      case 'removeProperties':
        stateClone = removeProperties({ ...stateClone }, action.keysToRemove);
        break;
      case 'addProperties':
        stateClone = addProperties({ ...stateClone }, action.extraData);
        break;
      default:
        throw new Error(`Unknown action type`);
    }
    result.push({ ...stateClone });
  });

  return result;
}

function clear() {
  return {};
}

function removeProperties(state, keysToRemove) {
  const keys = Array.isArray(keysToRemove) ? keysToRemove : [];

  for (const key of keys) {
    delete state[key];
  }

  return state;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);

  return state;
}

module.exports = transformStateWithClones;
