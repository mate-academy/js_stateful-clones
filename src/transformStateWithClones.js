'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let currentState = { ...initialState }; 

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
}
if (action.type === 'addProperties') {
  currentState = { ...currentState, ...action.extraData }; 
}

if (action.type === 'removeProperties') {
  const newState = { ...currentState };
  for (const key of action.keysToRemove) {
    delete newState[key];
  }
  currentState = newState;
}

result.push(currentState); 
}

return result;

module.exports = transformStateWithClones;
