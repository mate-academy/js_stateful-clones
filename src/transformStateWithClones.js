'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedStates = [Object.assign({}, state)];

  for (const action of actions) {
    const clonedState = Object.assign(
      {}, clonedStates[clonedStates.length - 1]
    );

    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        clonedStates.push(clonedState);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clonedState[key];
        }
        clonedStates.push(clonedState);
        break;

      case 'clear':
        clonedStates.push({});
        break;

      default:
        throw new Error('Invalid action type');
    }
  }

  return clonedStates.slice(1);
}

module.exports = transformStateWithClones;
