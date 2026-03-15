'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let current = { ...state };
  let history = [];

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
        break;
    }
    history.push(current);
  }

  return history;
}

function addProperties(target, source) {
  return { ...target, ...source };
}

function removeProperties(target, source) {
  const copy = { ...target };

  for (const key of source) {
    delete copy[key];
  }

  return copy;
}

function clear() {
  return {};
}

module.exports = transformStateWithClones;
