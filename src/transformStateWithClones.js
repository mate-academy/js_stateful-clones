'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const changedState = [];

  function clear() {
    for (const key in stateCopy) {
      delete stateCopy[key];
    }
  }

  function removeSomeKeys(keysArray) {
    for (const value of keysArray) {
      delete stateCopy[value];
    }
  }

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy, ...extraData,
        };
        break;

      case 'removeProperties':
        removeSomeKeys(keysToRemove);
        break;

      case 'clear':
        clear();
        break;
    }

    changedState.push({ ...stateCopy });
  }

  return changedState;
}

module.exports = transformStateWithClones;
