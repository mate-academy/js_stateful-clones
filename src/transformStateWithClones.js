'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = {};
  let arr = [];
  const arrFinish = [];

  for (const key in state) {
    copyState[key] = state[key];
  }

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        arrFinish.push({ ...Object.assign(copyState, obj.extraData) });
        break;

      case 'removeProperties':
        arr = obj.keysToRemove;

        for (const key of arr) {
          delete copyState[key];
        }
        arrFinish.push({ ...copyState });
        break;

      case 'clear':
        arr = Object.keys({ ...copyState });

        for (const key of arr) {
          delete copyState[key];
        }
        arrFinish.push({ ...copyState });
        break;
    }
  }

  return arrFinish;
}

module.exports = transformStateWithClones;
