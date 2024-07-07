'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const propertiesOfActios = [];
  const stateCopy = JSON.parse(JSON.stringify(state));

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        addToSolutionArray(propertiesOfActios, stateCopy);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        addToSolutionArray(propertiesOfActios, stateCopy);
        break;

      case 'clear':
        if (Object.keys(stateCopy).length === 0) {
          addToSolutionArray(propertiesOfActios, stateCopy);
          break;
        } else {
          clearProperties(stateCopy);
          addToSolutionArray(propertiesOfActios, stateCopy);
        }
        break;
    }
  }

  return propertiesOfActios;
}

function addProperties(stateCopy, extraData) {
  Object.assign(stateCopy, extraData);
}

function removeProperties(stateCopy, keysToRemove) {
  for (const key of keysToRemove) {
    delete stateCopy[key];
  }
}

function clearProperties(stateCopy) {
  for (const key in stateCopy) {
    delete stateCopy[key];
  }
}

function addToSolutionArray(result, stateCopy) {
  result.push({ ...stateCopy });
}

module.exports = transformStateWithClones;
