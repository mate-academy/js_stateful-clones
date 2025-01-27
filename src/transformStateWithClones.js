'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case 'removeProperties':
        for (let i = 0; i < action.keysToRemove.length; i++) {
          delete stateCopy[action.keysToRemove[i]];
        }
        break;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
    }

    const newObj = { ...stateCopy };

    result.push(newObj);
  }

  return result;
}

module.exports = transformStateWithClones;
