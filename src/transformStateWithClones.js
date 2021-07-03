'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newConstFirst = [];
  const newConstSecond = { ...state };

  for (const act in actions) {
    if (actions[act].type === 'addProperties') {
      Object.assign(newConstSecond, actions[act].extraData);
    };

    if (actions[act].type === 'removeProperties') {
      for (let i = 0; i < actions[act].keysToRemove.length; i++) {
        delete newConstSecond[actions[act].keysToRemove[i]];
      };
    };

    if (actions[act].type === 'clear') {
      for (const j in newConstSecond) {
        delete newConstSecond[j];
      }
    }
    newConstFirst.push({ ...newConstSecond });
  }

  return newConstFirst;
};

module.exports = transformStateWithClones;
