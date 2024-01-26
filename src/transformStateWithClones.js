'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  function applyAction(prevState, action) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        return Object.assign({}, prevState, action.extraData);

      case 'removeProperties':
        const newState = Object.assign({}, prevState);

        action.keysToRemove.forEach(key => delete newState[key]);

        return newState;

      case 'clear':
        return {};

      default:
        throw new Error(`Unknown action type: ${type}`);
    }
  }

  // Process each action in the actions array
  actions.forEach(action => {
    const prevState = result.length > 0 ? result[result.length - 1] : state;
    const nextState = applyAction(prevState, action);

    result.push(nextState);
  });

  return result;
}

module.exports = transformStateWithClones;
