'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const stateClone = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'addProperties':
        for (const addValues in action.extraData) {
          stateClone[addValues] = action.extraData[addValues];
        }
        break;

      case 'removeProperties':
        for (const removeValues of action.keysToRemove) {
          if (stateClone[removeValues]) {
            delete stateClone[removeValues];
          }
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }
    res.push({ ...stateClone });
  }

  return res;
}

module.exports = transformStateWithClones;
