'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const shot = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(shot, action.extraData);
      result.push({ ...shot });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete shot[key];
      }
      result.push({ ...shot });
    }

    if (action.type === 'clear') {
      for (const key of Object.keys(shot)) {
        delete shot[key];
      }
      result.push({ ...shot });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
