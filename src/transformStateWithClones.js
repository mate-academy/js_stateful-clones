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

  for (let i = 0; i < actions.length; i++) {
    const act = actions[i];

    if (act.type === 'addProperties') {
      Object.assign(stateCopy, act.extraData);
    }

    if (act.type === 'removeProperties') {
      for (const removeKey of act.keysToRemove) {
        delete stateCopy[removeKey];
      }
    }

    if (act.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
