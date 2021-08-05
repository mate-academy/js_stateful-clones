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
        break;
      case 'removeProperties':
        for (const keyWord of action.keysToRemove) {
          delete cloneOfState[keyWord];
        }
        break;
      case 'clear':
        for (const parameter in cloneOfState) {
          delete cloneOfState[parameter];
        }
        break;

      default:
        break;
    }

    oldVersionsArray.push({ ...cloneOfState });
  }

  return oldVersionsArray;
}

module.exports = transformStateWithClones;
