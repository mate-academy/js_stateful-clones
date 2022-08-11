'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allVersionsOfState = [];
  const versionOfState = { ...state };

  for (const objOfActions of actions) {
    const { type, extraData, keysToRemove } = objOfActions;

    switch (type) {
      case 'addProperties': {
        Object.assign(versionOfState, extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete versionOfState[key];
        }
        break;
      }

      case 'clear': {
        for (const key in versionOfState) {
          delete versionOfState[key];
        }
        break;
      }
    }

    allVersionsOfState.push(Object.assign({}, versionOfState));
  }

  return allVersionsOfState;
}

module.exports = transformStateWithClones;
