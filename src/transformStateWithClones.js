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
    switch (obj.type) {
      case 'addProperties':
        Object.assign(copyState, obj.extraData);
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }
    arreyOfChanges.push(Object.assign({}, copyState));
  }

  return arreyOfChanges;
}

module.exports = transformStateWithClones;
