'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const changes = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateClone, action.extraData);
        changes.push({ ...stateClone });
        break;

      case 'removeProperties':
        removeProperties(stateClone, action.keysToRemove);
        changes.push({ ...stateClone });
        break;

      case 'clear':
        clear(stateClone);
        changes.push({ ...stateClone });
        break;

      default:
        break;
    }
  }

  return changes;
}

function addProperties(stateClone, props) {
  Object.assign(stateClone, props);
}

function removeProperties(stateClone, props) {
  for (const key of props) {
    delete stateClone[key];
  }
}

function clear(stateClone) {
  for (const key in stateClone) {
    delete stateClone[key];
  }
}

module.exports = transformStateWithClones;
