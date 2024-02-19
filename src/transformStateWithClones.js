'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const currentState = { ...state };

  actions.forEach((actionObj) => {
    function deletePropsByKeys(keys) {
      keys.forEach((key) => {
        delete currentState[key];
      });
    }

    switch (actionObj.type) {
      case 'addProperties':
        Object.assign(currentState, { ...actionObj.extraData });
        break;
      case 'removeProperties':
        deletePropsByKeys(actionObj.keysToRemove);
        break;
      case 'clear':
        deletePropsByKeys(Object.keys(currentState));
        break;
    }

    states.push({ ...currentState });
  });

  return states;
}

module.exports = transformStateWithClones;
