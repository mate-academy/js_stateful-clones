'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionHistory = [];
  const copyState = { ...state };

  for (const el of actions) {
    const type = el.type;

    if (type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
      actionHistory.push({ ...copyState });
    }

    if (type === 'addProperties') {
      const addedProp = Object.assign(copyState, el.extraData);

      actionHistory.push({ ...addedProp });
    }

    if (type === 'removeProperties') {
      for (const rem of el.keysToRemove) {
        delete copyState[rem];
      }

      const removeProp = { ...copyState };

      actionHistory.push(removeProp);
    }
  }

  return actionHistory;
}

module.exports = transformStateWithClones;
