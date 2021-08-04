'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClone = { ...state };
  const storageActions = [];
  let index = 0;

  function pushAction(action) {
    const cloneActionResult = { ...action };

    return storageActions.push(cloneActionResult);
  }

  while (index < actions.length) {
    const typeAction = actions[index].type;

    switch (typeAction) {
      case 'addProperties':
        pushAction(Object.assign(stateClone, actions[index].extraData));
        break;
      case 'removeProperties':
        for (const keyToRemove of actions[index].keysToRemove) {
          delete stateClone[keyToRemove];
        }
        pushAction(stateClone);
        break;
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        pushAction(stateClone);
        break;
    }

    index++;
  }

  return storageActions;
}

module.exports = transformStateWithClones;
