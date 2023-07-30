'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clonedState = [];
  const currentStateData = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentStateData, action.extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete currentStateData[keyToRemove];
        }
        break;
      case 'clear':
        for (const key in currentStateData) {
          delete currentStateData[key];
        }
        break;
      default:
        throw new Error('Array have not correct action value');
    }
    clonedState.push({ ...currentStateData });
  }

  return clonedState;
}

module.exports = transformStateWithClones;
