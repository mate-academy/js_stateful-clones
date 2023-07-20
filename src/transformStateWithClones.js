'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const result = [];

  function pushToResult() {
    result.push({ ...stateClone });
  }

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        (Object.assign(stateClone, extraData));
        pushToResult();
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateClone[key];
        }
        pushToResult();
        break;
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        pushToResult();
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
