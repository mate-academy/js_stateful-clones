'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const history = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(newState, obj.extraData);
    }

    if (obj.type === 'removeProperties') {
      for (const item of obj.keysToRemove) {
        delete newState[item];
      }
    }

    if (obj.type === 'clear') {
      for (const item in newState) {
        delete newState[item];
      }
    }
    history.push({ ...newState });
  }

  return history;
}

module.exports = transformStateWithClones;
