'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const arrayOfStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
        
      case 'removeProperties':
        for (const deleteItem of action.keysToRemove) {
          delete newState[deleteItem];
        }
        break;

      case 'clear':
        for (const clearItem in newState) {
          delete newState[clearItem];
        }
        break;

      default :
        throw new Error('Unknown action! Please, enter valid value');
    }
    arrayOfStates.push({ ...newState });
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
