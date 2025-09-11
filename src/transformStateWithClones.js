'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prevState = { ...state };
  const states = [];

  for (const action of actions) {
    let newState;

    if (action.type === 'clear') {
      newState = {};
    } else if (action.type === 'addProperties') {
      newState = { ...prevState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      newState = { ...prevState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    } else {
      newState = { ...prevState };
    }

    states.push(newState);
    prevState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;
