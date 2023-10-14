'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedStates = [state];

  for (const action of actions) {
    const nextState = { ...transformedStates[transformedStates.length - 1] };

    if (action.type === 'addProperties') {
      Object.assign(nextState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    } else if (action.type === 'clear') {
      for (const key in nextState) {
        delete nextState[key];
      }
    }

    transformedStates.push(nextState);
  }

  return transformedStates.slice(1); // Exclude the initial state

}
module.exports = transformStateWithClones;
