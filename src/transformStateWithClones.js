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
      for (let j = 0; j < act.keysToRemove.length; j++) {
        const removeKey = act.keysToRemove[j];

        delete stateCopy[removeKey];
      }
    }

    if (act.type === 'clear') {
      for (const el in stateCopy) {
        delete stateCopy[el];
      }
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
