'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateClone = Object.assign({}, state);

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(stateClone, act.extraData);
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        stateClone = {};
        break;
    }
    result.push(Object.assign({}, stateClone));
  }

  return result;
}

module.exports = transformStateWithClones;
