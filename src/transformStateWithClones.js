'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const resultState = [];
  let copyState = { ...state };

  for (const action of actions) {
    switch (action['type']) {
      case 'addProperties':
        Object.assign(copyState, action['extraData']);
        break;

      case 'removeProperties':
        const delProp = action['keysToRemove'];

        for (const key of delProp) {
          delete copyState[key];
        }
        break;

      case 'clear':
        copyState = {};
        break;
    }

    resultState.push({ ...copyState });
  }

  return resultState;
}

module.exports = transformStateWithClones;
