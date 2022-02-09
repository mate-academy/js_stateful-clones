'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateModified = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateModified, action.extraData);

        result.push({ ...stateModified });

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateModified[key];
        }

        result.push({ ...stateModified });

        break;

      case 'clear':
        for (const key in stateModified) {
          delete stateModified[key];
        }

        result.push({ ...stateModified });

        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
