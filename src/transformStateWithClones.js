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

    switch (act.type) {
      case 'addProperties':
        Object.assign(stateCopy, act.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of act.keysToRemove) {
          delete stateCopy[removeKey];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
