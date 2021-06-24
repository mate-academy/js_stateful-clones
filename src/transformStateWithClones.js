'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({}, state);
  const resultOfActions = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const key in keysToRemove) {
          delete stateCopy[keysToRemove[key]];
        }
        break;

      case 'clear' :
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }
    resultOfActions.push({ ...stateCopy });
  }

  return resultOfActions;
}

module.exports = transformStateWithClones;
