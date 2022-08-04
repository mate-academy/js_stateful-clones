'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const act in actions) {
    const actObj = actions[act];

    if (actObj.type === 'addProperties') {
      Object.assign(newState, actObj.extraData);
    } else if (actObj.type === 'removeProperties') {
      for (const key in actObj.keysToRemove) {
        const prop = actObj.keysToRemove[key];

        delete newState[prop];
      }
    } else {
      for (const key in newState) {
        delete newState[key];
      }
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
