'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = [];
  const stateClone = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }

    if (type === 'addProperties') {
      for (const data in extraData) {
        stateClone[data] = extraData[data];
      }
    } else if (type === 'removeProperties') {
      for (const item in keysToRemove) {
        delete stateClone[keysToRemove[item]];
      }
    }
    clone.push(Object.assign({}, stateClone));
  }

  return clone;
}
module.exports = transformStateWithClones;
