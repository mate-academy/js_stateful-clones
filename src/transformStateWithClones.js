'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = [];

  stateCopy.push(Object.assign({}, state));

  for (let i = 0; i < Object.values(actions).length; i++) {
    if (i > 0) {
      stateCopy.push(Object.assign({}, stateCopy[i - 1]));
    }

    switch (actions[i].type) {
      case 'clear':
        Object.keys(stateCopy[i]).forEach(key => {
          delete stateCopy[i][key];
        });
        break;

      case 'removeProperties':
        actions[i].keysToRemove.forEach(key => {
          delete stateCopy[i][key];
        });
        break;

      case 'addProperties':
        for (const [key, value] of Object.entries(actions[i].extraData)) {
          stateCopy[i][key] = value;
        }
        break;

      default:
        return 'Error occured';
    }
  }

  return stateCopy;
}

module.exports = transformStateWithClones;
