'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const cloneArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const del in copyState) {
          delete copyState[del];
        };
        break;

      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
    }
    cloneArray.push({ ...copyState });
  }

  return cloneArray;
}

module.exports = transformStateWithClones;
