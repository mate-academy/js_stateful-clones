'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const temp = { ...state };

  for (const act in actions) {
    if (actions[act].type === 'addProperties') {
      Object.assign(temp, actions[act].extraData);
    };

    if (actions[act].type === 'removeProperties') {
      for (let i = 0; i < actions[act].keysToRemove.length; i++) {
        delete temp[actions[act].keysToRemove[i]];
      };
    };

    if (actions[act].type === 'clear') {
      for (const j in temp) {
        delete temp[j];
      }
    }
    res.push({ ...temp });
  }

  return res;
}

module.exports = transformStateWithClones;
