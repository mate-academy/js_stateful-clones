'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const transformationsLongList = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;
      case 'removeProperties':
        newState = Object.keys(newState).reduce((acc, key) => {
          if (!action.keysToRemove.includes(key)) {
            acc[key] = newState[key];
          }

          return acc;
        }, {});
        break;
      case 'clear':
        newState = {};
        break;
      default:
        break;
    }

    transformationsLongList.push({ ...newState });
  }

  return transformationsLongList;
}

module.exports = transformStateWithClones;
