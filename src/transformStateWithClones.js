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
  const addDataToArray = () => {
    clonedState.push({ ...currentStateData });
  };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentStateData, { ...action.extraData });
        addDataToArray();
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete currentStateData[keyToRemove];
        }
        addDataToArray();
        break;
      case 'clear':
        for (const key in currentStateData) {
          delete currentStateData[key];
        }
        addDataToArray();
        break;
      default:
        throw new Error('Array have not correct action value');
    }
  }

  return clonedState;
}

module.exports = transformStateWithClones;
