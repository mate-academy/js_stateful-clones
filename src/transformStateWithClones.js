'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateArr = [];
  const arrPush = () => stateArr.push({ ...newState });

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        arrPush();
        break;

      case 'removeProperties':
        for (const key in newState) {
          for (const removeKey of action.keysToRemove) {
            if (key === removeKey) {
              delete newState[key];
            }
          }
        }
        arrPush();
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        arrPush();
        break;
      default:
        throw new Error('Unknown action type');
    }
  }

  return stateArr;
}

module.exports = transformStateWithClones;
