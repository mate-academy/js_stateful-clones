'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}\
 */
function transformStateWithClones(state, actions) {
  const finalArr = [];
  const newState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        finalArr.push({ ...newState });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        finalArr.push({ ...newState });
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        finalArr.push({ ...newState });
        break;

      default:
        break;
    }
  }

  return finalArr;
}

module.exports = transformStateWithClones;
