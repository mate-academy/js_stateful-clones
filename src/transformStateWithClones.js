'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = { ...state };
  const newState = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties' :
        Object.assign(clones, extraData);
        break;

      case 'removeProperties' :
        for (const key of keysToRemove) {
          delete clones[key];
        }
        break;

      case 'clear' :
        for (const key in clones) {
          delete clones[key];
        }
        break;
    }
    newState.push({ ...clones });
  }

  return newState;
}

module.exports = transformStateWithClones;
