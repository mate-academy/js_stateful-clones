'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopies = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        stateCopy = removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        stateCopy = createEmptyState(stateCopy);
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateCopies.push({ ...stateCopy });
  }

  return stateCopies;
}

function addProperties(stateCopy, extraData) {
  return {
    ...stateCopy,
    ...extraData,
  };
}

function removeProperties(stateCopy, keysToRemove) {
  const updatedCopy = { ...stateCopy };

  for (const key of keysToRemove) {
    delete updatedCopy[key];
  }

  return updatedCopy;
}

function createEmptyState(stateCopy) {
  return {};
}

module.exports = transformStateWithClones;
