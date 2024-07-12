'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateCopy = { ...state };

  const addProperties = (extraData) => {
    stateCopy = Object.assign(stateCopy, extraData);
    stateHistory.push({ ...stateCopy });
  };

  const removeProperties = (keysToRemove) => {
    for (const remove in keysToRemove) {
      for (const keys in stateCopy) {
        if (keysToRemove[remove] === keys) {
          delete stateCopy[keys];
        }
      }
    }

    stateHistory.push({ ...stateCopy });
  };

  const clear = () => {
    for (const keys in stateCopy) {
      delete stateCopy[keys];
    }

    stateHistory.push({ ...stateCopy });
  };

  for (const keys in actions) {
    if (actions[keys].type === 'addProperties') {
      addProperties(actions[keys].extraData);
    }

    if (actions[keys].type === 'removeProperties') {
      removeProperties(actions[keys].keysToRemove);
    }

    if (actions[keys].type === 'clear') {
      clear(state);
    }
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
