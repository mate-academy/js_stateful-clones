'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const correctState = { ...state };
  let clone = {};
  const result = [];

  for (const action of actions) {
    clone = {};

    switch (action.type) {
      case 'addProperties':
        Object.assign(correctState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete correctState[key];
        }
        break;

      case 'clear':
        for (const key in correctState) {
          delete correctState[key];
        }
        break;
    }

    result.push(Object.assign(clone, correctState));
  }

  return result;
}

module.exports = transformStateWithClones;
