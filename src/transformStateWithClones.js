'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = {
    ...state,
  };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[key];
        }

        break;

      case 'addProperties':
        const extraData = action.extraData;

        for (const key in extraData) {
          clone[key] = extraData[key];
        }

        break;

      default:
        break;
    }

    history.push({ ...clone });
  }

  return history;
}

module.exports = transformStateWithClones;
