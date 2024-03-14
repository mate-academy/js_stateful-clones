'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const stateClone = JSON.parse(JSON.stringify(state));

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const elem of action.keysToRemove) {
        delete stateClone[elem];
      }
    } else if (action.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }

    result.push(Object.assign({}, stateClone));
  }

  return result;
}

module.exports = transformStateWithClones;
