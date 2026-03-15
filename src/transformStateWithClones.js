'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let current = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        current = addProperties(current, action.extraData);
        break;

      case 'removeProperties':
        current = removeProperties(current, action.keysToRemove);
        break;

      case 'clear':
        current = clear();
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    history.push(current);
  }

  return history;
}

function addProperties(target, source) {
  return { ...target, ...source };
}

function removeProperties(target, source) {
  const stateCopy = { ...target };

  for (const key of source) {
    delete stateCopy[key];
  }

  return stateCopy;
}

function clear() {
  return {};
}

module.exports = transformStateWithClones;
