'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateVersions = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clear(stateCopy);
        break;

      default:
        throw new Error(`invalid type of action: ${action.type}`);
    }

    stateVersions.push({ ...stateCopy });
  });

  return stateVersions;
}

function removeProperties(copy, listOfKeys) {
  for (const key of listOfKeys) {
    delete copy[key];
  }
}

function clear(copy) {
  for (const key in copy) {
    delete copy[key];
  }
}

module.exports = transformStateWithClones;
