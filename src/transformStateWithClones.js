'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch(action.type) {
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case 'addProperties':
        Object.assign(stateCopy, { ...action.extraData });
        break;

      default:
        for (let key = 0; key < action.keysToRemove.length; key++) {
          delete stateCopy[action.keysToRemove[key]];
        }
        break;
    }

    const copy = { ...stateCopy };

    result.push(copy);
  }

  return result;
}

module.exports = transformStateWithClones;
