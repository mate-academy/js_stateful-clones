'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  for (const action of actions) {
    const lastStateVersion = stateHistory[stateHistory.length - 1] || state;

    switch (action.type) {
      case 'addProperties':
        stateHistory.push(addProperties(lastStateVersion, action.extraData));
        break;

      case 'removeProperties':
        stateHistory.push(
          removeProperties(lastStateVersion, action.keysToRemove),
        );
        break;

      case 'clear':
        stateHistory.push(clear(lastStateVersion));
        break;
    }
  }

  function addProperties(lastState, properties) {
    return {
      ...lastState,
      ...properties,
    };
  }

  function removeProperties(lastState, properties) {
    const stateCopy = { ...lastState };

    for (const property of properties) {
      delete stateCopy[property];
    }

    return stateCopy;
  }

  function clear(lastState) {
    const stateCopy = { ...lastState };

    for (const key of Object.keys(stateCopy)) {
      delete stateCopy[key];
    }

    return stateCopy;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
