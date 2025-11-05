'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const history = [];

  for (const action of actions) {
    const newState = { ...copyState };

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        newState[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    } else if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    history.push({ ...newState });

    copyState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
