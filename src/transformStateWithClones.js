'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsArray = [{ ...state }];

  for (const action of actions) {
    const stateCopy = { ...actionsArray[actionsArray.length - 1] };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      }

      case 'clear': {
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      }
    }
    actionsArray.push(stateCopy);
  }

  actionsArray.shift();

  return actionsArray;
}

module.exports = transformStateWithClones;
