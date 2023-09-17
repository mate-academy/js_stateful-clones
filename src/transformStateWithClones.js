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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);

        const addState = { ...copyState };

        result.push(addState);
        break;

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }

        const removeState = { ...copyState };

        result.push(removeState);
        break;
      }

      case 'clear': {
        for (const key of Object.keys(copyState)) {
          delete copyState[key];
        }

        const deleteState = { ...copyState };

        result.push(deleteState);
        break;
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
