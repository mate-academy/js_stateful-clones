'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const registryOfState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);

        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete newState[remove];
        }

        break;

      case `clear`:
        for (const clear in newState) {
          delete newState[clear];
        }

        break;
    }

    registryOfState.push(Object.assign({}, newState));
  };

  return registryOfState;
}

module.exports = transformStateWithClones;
