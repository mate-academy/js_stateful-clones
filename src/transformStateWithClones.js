'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneOfState = { ...state };
  const oldVersionsArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneOfState, action.extraData);
        oldVersionsArray.push({ ...cloneOfState });
        break;
      case 'removeProperties':
        for (const keyWord of action.keysToRemove) {
          delete cloneOfState[keyWord];
        }
        oldVersionsArray.push({ ...cloneOfState });
        break;
      case 'clear':
        for (const parameter in cloneOfState) {
          delete cloneOfState[parameter];
        }
        oldVersionsArray.push({ ...cloneOfState });
        break;

      default:
        break;
    }
  }

  return oldVersionsArray;
}

module.exports = transformStateWithClones;
