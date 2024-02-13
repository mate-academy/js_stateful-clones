'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({}, state);
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      for (let j = 0; j < Object.keys(stateCopy).length;) {
        delete stateCopy[Object.keys(stateCopy)[j]];
      }

      result.push({ ...stateCopy });
    }

    if (actions[i].type === 'addProperties') {
      Object.assign(stateCopy, actions[i].extraData);
      result.push(Object.assign({ ...stateCopy }, actions[i].extraData));
    }

    if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        delete stateCopy[actions[i].keysToRemove[j]];
      }

      result.push({ ...stateCopy });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
