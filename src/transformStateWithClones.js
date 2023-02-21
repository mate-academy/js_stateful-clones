'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state = {}, actions) {
  const result = [];
  const stateClone = Object.assign({}, state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }

        break;
      case 'addProperties':
        Object.assign(stateClone, extraData);

        break;

      case 'removeProperties':
        for (const remove of keysToRemove) {
          delete stateClone[remove];
        }
    }
    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
