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
    if (objOfActions['type'] === 'addProperties') {
      Object.assign(versionOfState, objOfActions['extraData']);
    }

    if (objOfActions['type'] === 'removeProperties') {
      for (const arr of objOfActions['keysToRemove']) {
        delete versionOfState[arr];
      }
    }

    if (objOfActions['type'] === 'clear') {
      for (const propertie in versionOfState) {
        delete versionOfState[propertie];
      }
    }

    allVersionsOfState.push(Object.assign({}, versionOfState));
  }

  return allVersionsOfState;
}

module.exports = transformStateWithClones;
