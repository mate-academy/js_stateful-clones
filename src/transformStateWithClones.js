'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let myState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        myState = {
          ...myState,
          ...action.extraData,
        };
        result.push({ ...myState });
        break;

      case 'removeProperties':
        for (const toDelete of action.keysToRemove) {
          delete myState[toDelete];
        }
        result.push({ ...myState });
        break;

      case 'clear':
        myState = {};
        result.push({ ...myState });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
