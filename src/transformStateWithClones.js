'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copy = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      copy = Object.assign(copy, actions[i].extraData);
      result.push(Object.assign({}, copy));
    }

    if (actions[i].type === 'removeProperties') {
      for (let y = 0; y < actions[i].keysToRemove.length; y++) {
        delete copy[actions[i].keysToRemove[y]];
      }
      result.push(Object.assign({}, copy));
    }

    if (actions[i].type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
      result.push(Object.assign({}, copy));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
