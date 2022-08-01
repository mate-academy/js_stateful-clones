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

        const newCloneAdd = {
          ...cloneState,
        };

        result.push(newCloneAdd);
        break;

      case 'removeProperties':
        const deleteValue = action.keysToRemove;

        for (const i of deleteValue) {
          delete cloneState[i];
        }

        const newCloneRemove = {
          ...cloneState,
        };

        result.push(newCloneRemove);
        break;

      case 'clear':
        cloneState = {};
        result.push(Object.assign({}, cloneState));
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
