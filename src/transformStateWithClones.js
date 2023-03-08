'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = {};
  let tempArr = [];
  const arrFinish = [];

  for (const key in state) {
    copyState[key] = state[key];
  }

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(copyState, obj.extraData)
        break;

      case 'removeProperties':
        tempArr = obj.keysToRemove;

        for (const key of tempArr) {
          delete copyState[key];
        }
        break;

      case 'clear':
        tempArr = Object.keys({ ...copyState });

        for (const key of tempArr) {
          delete copyState[key];
        }
        break;
    }
    arrFinish.push({ ...copyState });
  }

  return arrFinish;
}

module.exports = transformStateWithClones;
