'use strict';

/**
 * @param {Object} state
 * @param {Object} action
 *
 * @return {Object}
 */
const procces = (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'addProperties':
      Object.assign(newState, action.extraData);
      break;
    case 'removeProperties':
      for (const prop of action.keysToRemove) {
        delete newState[prop];
      }
      break;
    case 'clear':
      for (const key in state) {
        delete newState[key];
      }
      break;
    default:
      throw new Error('Switch/Case error');
  }

  return newState;
};

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  for (const action of actions) {
    const currentState = stateHistory[stateHistory.length - 1] || state;

    stateHistory.push(procces(currentState, action));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
