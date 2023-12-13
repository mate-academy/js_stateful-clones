'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      stateCopy = {};
      result.push({});
    } else if (actions[i].type === 'addProperties') {
      stateCopy = {
        ...stateCopy,
        ...actions[i].extraData,
      };
      result.push({ ...stateCopy });
    } else if (actions[i].type === 'removeProperties') {
      actions[i].keysToRemove.forEach(e => delete stateCopy[e]);
      result.push({ ...stateCopy });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
