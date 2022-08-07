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

    switch (actObj.type) {
      case 'addProperties':
        Object.assign(newState, actObj.extraData);
        break;
      case 'removeProperties':
        for (const key in actObj.keysToRemove) {
          const prop = actObj.keysToRemove[key];

          delete newState[prop];
        }
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
