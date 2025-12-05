'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
const newState = { ... state};

if (action.type === 'clear') {
    for (const key in newState) {
      delete newState[key];
    }
  }

    for (const action of actions) {
  if (action.type === 'addProperties') {
    Object.assign(newState, action.extraData);
  }

  if (action.type === 'removeProperties') {
    for (const key of action.keysToRemove) {
      delete newState[key];
    }
  }

  const stateHistory = [];

  stateHistory.push({...newState});
}

return stateHistory;



}
