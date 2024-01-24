'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const modifiedStates = [];
  const cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        Object.keys(cloneState).forEach((key) => {
          delete cloneState[key];
        });
        break;
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete cloneState[key];
        });
        break;
    }

    modifiedStates.push({ ...cloneState });

    // return cloneState;
  };

  return modifiedStates;
}

module.exports = transformStateWithClones;
