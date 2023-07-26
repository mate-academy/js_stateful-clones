'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  let pushObj;
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        pushObj = { ...newState };
        result.push(pushObj);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        pushObj = { ...newState };
        result.push(pushObj);
        break;
      case 'clear':
        for (const key in newState) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        pushObj = { ...newState };
        result.push(pushObj);
        break;
      default:
        throw new Error('Something went wrong !');
    }
  }

  return result;
}

module.exports = transformStateWithClones;
