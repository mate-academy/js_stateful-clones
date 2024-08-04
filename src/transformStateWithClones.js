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
    if (actions[i].type === 'addProperties') {
      Object.assign(stateCopy, actions[i].extraData);
      history.push({ ...stateCopy });
    }

    if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        delete stateCopy[actions[i].keysToRemove[j]];
      }
      history.push({ ...stateCopy });
    }

    if (actions[i].type === 'clear') {
      Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
      history.push({ ...stateCopy });
    }
  }

  return history;
}

module.exports = transformStateWithClones;
