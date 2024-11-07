'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentStateClone = { ...state };
  const stateChanges = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(currentStateClone, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentStateClone[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in currentStateClone) {
        delete currentStateClone[key];
      }
    }
    stateChanges.push({ ...currentStateClone });
  }

  return stateChanges;
}

module.exports = transformStateWithClones;
