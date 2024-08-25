'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resArray = [];
  let stateCopy = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      const extraData = actions[i].extraData;

      for (const key in extraData) {
        stateCopy[key] = extraData[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      const keysToRemove = actions[i].keysToRemove;

      for (let j = 0; j < keysToRemove.length; j++) {
        delete stateCopy[keysToRemove[j]];
      }
    }

    if (actions[i].type === 'clear') {
      stateCopy = {};
    }

    resArray.push({ ...stateCopy });
  }

  return resArray;
}

module.exports = transformStateWithClones;
