'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        history.push({ ...copyState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        history.push({ ...copyState });
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        history.push({ ...copyState });
    }
  }

  return history;
}

module.exports = transformStateWithClones;
