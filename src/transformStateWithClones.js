'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = {
    ...state,
  };
  const arreyOfChanges = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(copyState, obj.extraData);
      arreyOfChanges.push(Object.assign({}, copyState));
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete copyState[key];
      }
      arreyOfChanges.push(Object.assign({}, copyState));
    }

    if (obj.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
      arreyOfChanges.push(Object.assign({}, copyState));
    }
  }

  return arreyOfChanges;
}

module.exports = transformStateWithClones;
