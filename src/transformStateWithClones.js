'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const story = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState = { ...currentState };

    const actionType = action.type;

    if (actionType === 'clear') {
      nextState = {};
    }

    if (actionType === 'addProperties') {
      nextState = {
        ...nextState,
        ...action.extraData,
      };
    }

    if (actionType === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    }
    story.push(nextState);
    currentState = nextState;
  }

  return story;
}
module.exports = transformStateWithClones;
