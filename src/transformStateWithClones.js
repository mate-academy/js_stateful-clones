'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newActions = [];
  let newState = { ...state };

  for (const actionsObject of actions) {
    switch (actionsObject.type) {
      case 'addProperties':
        Object.assign(newState, actionsObject.extraData);
        break;
      case 'removeProperties':
        for (const toRemoveProperty of actionsObject.keysToRemove) {
          if (newState.hasOwnProperty(toRemoveProperty)) {
            delete newState[toRemoveProperty];
          }
        };
        break;
      case 'clear':
        newState = {};
        break;
    }
    newActions.push({ ...newState });
  };

  return newActions;
}

module.exports = transformStateWithClones;
