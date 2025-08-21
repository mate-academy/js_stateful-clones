'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  const stateClone = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        addProperties(stateClone, extraData);
        stateClones.push({ ...stateClone });
        break;

      case 'removeProperties':
        removeProperties(stateClone, keysToRemove);
        stateClones.push({ ...stateClone });
        break;

      case 'clear':
        clearState(stateClone);
        stateClones.push({ ...stateClone });
    }
  }

  return stateClones;
}

function addProperties(stateClone, extraData) {
  Object.assign(stateClone, extraData);
}

function removeProperties(stateClone, keysToRemove) {
  for (const key of keysToRemove) {
    if (key in stateClone) {
      delete stateClone[key];
    }
  }
}

function clearState(stateClone) {
  for (const key in stateClone) {
    delete stateClone[key];
  }
}

module.exports = transformStateWithClones;
