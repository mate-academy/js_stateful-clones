'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objNew = { ...state };
  const arrResult = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'clear':
        for (const key in objNew) {
          delete objNew[key];
        }

        break;

      case 'removeProperties':
        const arrKeyDelete = actions[i].keysToRemove;

        for (const key of arrKeyDelete) {
          delete objNew[key];
        }

        break;

      case 'addProperties':
        const objKeyJoin = actions[i].extraData;

        Object.assign(objNew, objKeyJoin);
    }

    arrResult.push({ ...objNew });
  }

  return arrResult;
}

module.exports = transformStateWithClones;
