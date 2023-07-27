'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const registryOfstate = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':

        Object.assign(copyState, action.extraData);

        break;

      case 'removeProperties':

        for (const remove of action.keysToRemove) {
          delete copyState[remove];
        }

        break;

      case 'clear':

        for (const clear in copyState) {
          delete copyState[clear];
        }

        break;
    }

    registryOfstate.push(Object.assign({}, copyState));
  };

  return registryOfstate;
}

module.exports = transformStateWithClones;
