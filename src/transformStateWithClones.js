'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = [];
  const stateNew = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const addProp = action.extraData;

      for (const prop in addProp) {
        stateNew[prop] = addProp[prop];
      }
    }

    if (action.type === 'removeProperties') {
      const removeProp = action.keysToRemove;

      for (const prop of removeProp) {
        delete stateNew[prop];
      }
    }

    if (action.type === 'clear') {
      for (const prop in stateNew) {
        delete stateNew[prop];
      }
    }

    const stateVers = { ...stateNew };

    transformedState.push(stateVers);
  }

  return transformedState;
}

module.exports = transformStateWithClones;
