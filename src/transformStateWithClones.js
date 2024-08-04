'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const stateCopy = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateCopy, actions[i].extraData);
        break;

      case 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          delete stateCopy[actions[i].keysToRemove[j]];
        }
        break;

      case 'clear':
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        break;

      case 'default':
        break;
    }

    history.push({ ...stateCopy });
  }

  return history;
}

module.exports = transformStateWithClones;
