'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];

  let currentState = { ...state };

  for (const action of actions) {
    let stateCopy = { ...currentState };
    const actionType = action.type;

    if (actionType === 'addProperties') {
      stateCopy = { ...stateCopy, ...action.extraData };
    } else if (actionType === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }
    } else if (actionType === 'clear') {
      stateCopy = {};
    }
    resultStates.push(stateCopy);
    currentState = stateCopy;
  }

  return resultStates;
}

module.exports = transformStateWithClones;
