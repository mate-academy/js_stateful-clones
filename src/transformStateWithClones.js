'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultState = [{ ...state }];

  for (let i = 0; i < actions.length; i++) {
    const { type, keysToRemove, extraData } = actions[i];

    if (i > 0) {
      Object.assign(resultState[i] = {}, resultState[i - 1]);
    }

    switch (type) {
      case 'addProperties':
        Object.assign(resultState[i], extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete resultState[i][key];
        }
        break;

      case 'clear':
        for (const key in resultState[i]) {
          delete resultState[i][key];
        }
    }
  }

  return resultState;
}

module.exports = transformStateWithClones;
