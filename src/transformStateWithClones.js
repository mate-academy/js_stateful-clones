'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // This array will store the history of states after each action.
  const stateHistory = [];

  // We use Array.prototype.reduce to process the actions sequentially.
  // The 'accumulator' in this case is the state from the previous step.
  // We start the reduction with a shallow clone of the state
  // to ensure the original object is never mutated.
  actions.reduce((previousState, action) => {
    let nextState;

    // A switch statement handles the different action types.
    switch (action.type) {
      case 'addProperties':
        // Create a new state object by spreading the previous state
        // and the new data. This merges the two objects.
        nextState = { ...previousState, ...action.extraData };
        break;

      case 'removeProperties':
        // First, create a clone of the previous state.
        nextState = { ...previousState };
        // Then, iterate over the keys to remove and delete them from the new clone.
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        // The new state is simply an empty object.
        nextState = {};
        break;

      default:
        // If the action type is unrecognized, we just carry over the previous
        // state by creating a clone of it.
        nextState = { ...previousState };
        break;
    }

    // Add the newly calculated state to our history array.
    stateHistory.push(nextState);

    // Return the new state so it can be used as the 'previousState'
    // for the next action in the sequence.
    return nextState;
  }, { ...state }); // The second argument to reduce is the initial value.

  return stateHistory;
}

module.exports = transformStateWithClones;
