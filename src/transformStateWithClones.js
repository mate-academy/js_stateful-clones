'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let newStateItem = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newStateItem, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newStateItem[key];
        }
        break;

      case 'clear':
        newStateItem = {};
        break;

      default:
        return newStateItem;
    }

    const copyState = { ...newStateItem };

    newState.push(copyState);
  }

  return newState;
}

module.exports = transformStateWithClones;
