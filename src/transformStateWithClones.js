'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(stateCopy, { ...actions[i].extraData });
    }

    if (actions[i].type === 'removeProperties') {
      actions[i].keysToRemove.forEach((key) => delete stateCopy[key]);
    }

    if (actions[i].type === 'clear') {
      stateCopy = {};
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
