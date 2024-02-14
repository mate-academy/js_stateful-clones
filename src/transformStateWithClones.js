'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];
  let newState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        newState = {
          ...newState, ...actions[i].extraData,
        };
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          if (key in newState) {
            delete newState[key];
          }
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        newState = { ...state };
    }

    newArr.push({ ...newState });
  }

  return newArr;
}

module.exports = transformStateWithClones;
