'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        const { extraData } = action;

        Object.assign(stateCopy, extraData);

        break;

      case action.type === 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        break;

      case action.type === 'clear':
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
