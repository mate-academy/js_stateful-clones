'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];

  const copy = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const currentAction = actions[i];

    switch (currentAction.type) {
      case 'addProperties':
        Object.assign(copy, currentAction.extraData);
        break;

      case 'removeProperties':
        for (const key of currentAction.keysToRemove) {
          delete copy[key];
        }
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
    }
    arr.push({ ...copy });
  }

  return arr;
}

module.exports = transformStateWithClones;
