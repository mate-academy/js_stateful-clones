'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfState = [];
  const transformState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(transformState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete transformState[key];
      }
    } else if (action.type === 'clear') {
      for (const key in transformState) {
        delete transformState[key];
      }
    }

    const transformStateForReplace = { ...transformState };

    arrayOfState.push(transformStateForReplace);
  }

  return arrayOfState;
}

module.exports = transformStateWithClones;
