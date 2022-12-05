'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let clonesState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonesState, action.extraData);
        break;

      case 'removeProperties':
        for (const n of action.keysToRemove) {
          delete clonesState[n];
        }
        break;

      case 'clear':
        clonesState = {};
        break;
    }
    result.push({ ...clonesState });
  }

  return result;
}

module.exports = transformStateWithClones;
