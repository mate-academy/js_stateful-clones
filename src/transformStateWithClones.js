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
  let currentState = { ...state };

  for (const action of actions) {
    const { type } = action;
    let nextState = {};

    switch (type) {
      case 'addProperties':
        Object.assign(nextState, currentState, action.extraData);
        break;

      case 'removeProperties':
        nextState = removeProperties({ ...currentState }, action.keysToRemove);
        break;

      case 'clear':
        nextState = removeProperties(
          { ...currentState },
          Object.keys(currentState),
        );
        break;

      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    result.push(nextState);
    currentState = { ...nextState };
  }

  return result;
}

function removeProperties(state, properties) {
  for (const property of properties) {
    delete state[property];
  }

  return state;
}

module.exports = transformStateWithClones;
