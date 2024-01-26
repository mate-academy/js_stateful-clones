'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove = [] } = action;

    switch (type) {
      case 'addProperties':
        stateClone = {
          ...stateClone,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        stateClone = {};
        break;
    }

    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
