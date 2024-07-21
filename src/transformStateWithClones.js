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
    if (action.type === 'addProperties') {
      stateCopy = addProperties(stateCopy, action.extraData);
    } else if (action.type === 'removeProperties') {
      stateCopy = removeProperties(stateCopy, action.keysToRemove);
    } else if (action.type === 'clear') {
      stateCopy = clear(stateCopy);
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

function clear(stateCopy) {
  return {};
}

module.exports = transformStateWithClones;
