'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const states = [];

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        newState = { ...newState, ...i.extraData };
        break;
      case 'removeProperties':
        newState = { ...newState };

        for (const key of i.keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        newState = {};
        break;
    }
    states.push({ ...newState });
  }

  return states;
}
module.exports = transformStateWithClones;
