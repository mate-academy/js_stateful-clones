'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = structuredClone(state);
  const history = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          newState[key] = actions[i].extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key in actions[i].keysToRemove) {
          delete newState[actions[i].keysToRemove[key]];
        }
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
    } /* end switch */

    const newHistory = structuredClone(newState);

    history.push(newHistory);
  } /* end for */

  return history;
}

module.exports = transformStateWithClones;
