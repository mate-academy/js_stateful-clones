'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const historyState = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperty(stateCopy, action.extraData);
        historyState.push({ ...stateCopy });
        break;
      case 'removeProperties':
        removeProperty(stateCopy, action.keysToRemove);
        historyState.push({ ...stateCopy });
        break;
      case 'clear':
        clearProperty(stateCopy);
        historyState.push({ ...stateCopy });
        break;
    }
  }

  function addProperty(stat, data) {
    Object.assign(stat, data);
  }

  function removeProperty(stat, keys) {
    for (const key of keys) {
      if (key in stat) {
        delete stat[key];
      }
    }
  }

  function clearProperty(stat) {
    for (const key in stat) {
      delete stat[key];
    }
  }

  return historyState;
}

module.exports = transformStateWithClones;
