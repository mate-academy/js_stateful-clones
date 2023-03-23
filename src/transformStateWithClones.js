'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [state];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let nextState = { ...result[i] };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (nextState.hasOwnProperty(key)) {
            delete nextState[key];
          }
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        return;
    }

    result.push(nextState);
  }

  return result.slice(1);
}

module.exports = transformStateWithClones;
