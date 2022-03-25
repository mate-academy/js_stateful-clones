'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const newArr = [];

  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key in action.keysToRemove) {
          if (stateCopy[action.keysToRemove[key]]) {
            delete stateCopy[action.keysToRemove[key]];
          }
        };
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
        break;
    }
    newArr.push({ ...stateCopy });
  }

  return (newArr);
}

module.exports = transformStateWithClones;
