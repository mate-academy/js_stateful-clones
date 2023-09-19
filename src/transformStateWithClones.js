'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [];
  const stateCopy = Object.assign({}, state);
  const ADD_ACTION = 'addProperties';
  const REMOVE_ACTION = 'removeProperties';
  const CLEAR_ACTION = 'clear';

  for (const action of actions) {
    const { 
      type, 
      extraData = null, 
      keysToRemove = null,
    } = { ...action };

    switch (type) {
      case ADD_ACTION:
        Object.assign(stateCopy, extraData);
        break;

      case REMOVE_ACTION:
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case CLEAR_ACTION:
        const keysToDelete = Object.keys(stateCopy);

        for (const key of keysToDelete) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error('This action is not possible.');
    }

    arrayOfStates.push({ ...stateCopy });
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
