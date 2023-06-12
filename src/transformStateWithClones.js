'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const resultActions = [];

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    if (type === 'addProperties') {
      Object.assign(stateCopy, extraData);
      resultActions.push({ ...stateCopy });
    }

    if (type === 'removeProperties') {
      for (const key in keysToRemove) {
        delete stateCopy[keysToRemove[key]];
      }
      resultActions.push({ ...stateCopy });
    }

    if (type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }

      resultActions.push({ ...stateCopy });
    }
  }

  return resultActions;
}

module.exports = transformStateWithClones;
