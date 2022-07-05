'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateMods = [];
  let modifiedState = {
    ...state,
  };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(modifiedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (modifiedState.hasOwnProperty(key)) {
            delete modifiedState[key];
          }
        }
        break;

      case 'clear':
        for (const key in modifiedState) {
          delete modifiedState[key];
        }
        break;

      default:
        throw new Error('Action is invalid');
    }
    stateMods.push(modifiedState);

    modifiedState = {
      ...modifiedState,
    };
  }

  return stateMods;
}

module.exports = transformStateWithClones;
