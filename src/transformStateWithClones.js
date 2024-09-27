'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const cloneState = { ...state };

  for (const action of actions) {
    const extraData = action.extraData;
    const keysToRemove = action.keysToRemove;

    switch (action.type) {
      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;

      case 'addProperties':
        for (const key in extraData) {
          cloneState[key] = extraData[key];
        }

        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete cloneState[key];
        }

        break;
    }
    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;
