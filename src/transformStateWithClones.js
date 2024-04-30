'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const resultArray = [];
  const stateClone = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateClone, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(stateClone, action.keysToRemove);
        break;
      case 'clear':
        clear(stateClone);
        break;
    }
    resultArray.push({ ...stateClone });
  }

  return resultArray;
}

function addProperties(stateClone, extraData) {
  Object.assign(stateClone, extraData);
}

function removeProperties(stateClone, keysToRemove) {
  for (const key of keysToRemove) {
    delete stateClone[key];
  }
}

function clear(stateClone) {
  for (const key in stateClone) {
    delete stateClone[key];
  }
}

module.exports = transformStateWithClones;
