'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let forCloneState = { ...state };
  const forCloneActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(forCloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete forCloneState[key];
        }
        break;

      case 'clear':
        forCloneState = {};
        break;
    }

    forCloneActions.push({ ...forCloneState });
  }

  return forCloneActions;
}

module.exports = transformStateWithClones;
