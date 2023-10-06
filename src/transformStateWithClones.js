'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = {
    ...state,
  };

  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        const deleteValue = action.keysToRemove;

        for (const i of deleteValue) {
          delete cloneState[i];
        }

        break;

      case 'clear':
        cloneState = {};
        break;
    }

    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;
