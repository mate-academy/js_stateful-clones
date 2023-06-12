'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [];
  const stateObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateObj, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateObj[keyToRemove];
        };
        break;

      case 'clear':
        for (const property of Object.keys(stateObj)) {
          delete stateObj[property];
        };
    }
    arrayOfStates.push({ ...stateObj });
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
