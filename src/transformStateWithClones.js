'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const transformedState = [];
  let result;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clear(stateCopy);
        break;
    }

    result = copy(stateCopy);
    transformedState.push(result);
  }

  return transformedState;
}

function addProperties(stateCopy, extraData) {
  Object.assign(stateCopy, extraData);
}

function removeProperties(stateCopy, keysToRemove) {
  for (const key1 of keysToRemove) {
    delete stateCopy[key1];
  }
}

function clear(stateCopy) {
  for (const key in stateCopy) {
    delete stateCopy[key];
  }
}

function copy(sourse) {
  return { ...sourse };
}

module.exports = transformStateWithClones;
