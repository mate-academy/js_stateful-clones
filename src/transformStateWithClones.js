'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const tempObj = { ...state };
  const clone = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'clear':
        for (const key in tempObj) {
          delete tempObj[key];
        }
        break;
      case 'addProperties':
        Object.assign(tempObj, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete tempObj[key];
        }
        break;

      default:
        break;
    }
    clone.push({ ...tempObj });
  }

  return clone;
}

module.exports = transformStateWithClones;
