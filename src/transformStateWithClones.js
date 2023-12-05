'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  function applyAction(currentState, action) {
    const newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        });
        break;
      case 'clear':
        return {};
      default:
        break;
    }

    return newState;
  }

  actions.reduce((currentState, action) => {
    const nextState = applyAction(currentState, action);

    result.push(nextState);

    return nextState;
  }, state);

  return result;
}

module.exports = transformStateWithClones;
