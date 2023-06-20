'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = Object.assign({}, state);

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(copyState, obj.extraData);

        break;

      case 'removeProperties':
        for (const remove of obj.keysToRemove) {
          delete copyState[remove];
        }

        break;

      case 'clear':
        for (const del in copyState) {
          delete copyState[del];
        }

        break;
    }
    result.push(Object.assign({}, copyState));
  }

  return result;
}

module.exports = transformStateWithClones;
