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
    if (action.type === 'addProperties') {
      Object.assign(stateObj, action.extraData);
      arrayOfStates.push({ ...stateObj });
    }

    if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete stateObj[keyToRemove];
      };
      arrayOfStates.push({ ...stateObj });
    }

    if (action.type === 'clear') {
      for (const property of Object.keys(stateObj)) {
        delete stateObj[property];
      };
      arrayOfStates.push({});
    }
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
