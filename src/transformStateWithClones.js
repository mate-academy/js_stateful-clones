'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStateVersions = [];
  const currentState = {
    ...state,
  };

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          currentState[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
    }
    allStateVersions.push(Object.assign({}, currentState));
  });

  return allStateVersions;
}

module.exports = transformStateWithClones;
