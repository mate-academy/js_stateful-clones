'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithstateCopys(state, actions) {
  const stateCopy = Object.assign({}, state);
  const stateArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
        break;

      case 'removeProperties':

        for (const i in keysToRemove) {
          delete stateCopy[keysToRemove[i]];
        }
        break;

      default :
        break;
    }
    stateArray.push(Object.assign({}, stateCopy));
  }

  return stateArray;
}

module.exports = transformStateWithstateCopys;
