'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateChain = [];
  const stateCopy = { ...state };
  const ACTIONS = {
    add: 'addProperties',
    remove: 'removeProperties',
    clear: 'clear',
  };

  const stateChainAdder = () => stateChain.push({ ...stateCopy });
  const deleteObjectKeys = (paramsToDelete, objToDelete) => {
    for (const key of paramsToDelete) {
      delete objToDelete[key];
    }
  };

  for (const action of actions) {
    switch (action.type) {
      case ACTIONS.add:
        Object.assign(stateCopy, action.extraData);

        break;

      case ACTIONS.remove:
        deleteObjectKeys(action.keysToRemove, stateCopy);
        break;

      case ACTIONS.clear:
        deleteObjectKeys(Object.keys(stateCopy), stateCopy);
        break;

      default:
        return null;
    }

    stateChainAdder();
  }

  return stateChain;
}

module.exports = transformStateWithClones;
