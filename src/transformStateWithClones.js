'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const newObj = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        for (const el in key.extraData) {
          newObj[el] = key.extraData[el];
        }
        break;
      case 'removeProperties':
        for (const el in key.keysToRemove) {
          delete newObj[key.keysToRemove[el]];
        }
        break;
      case 'clear':
        for (const elem in newObj) {
          delete newObj[elem];
        }
        break;
      default:
        history.push(newObj);
    }
    history.push({ ...newObj });
  }

  return history;
}

module.exports = transformStateWithClones;
