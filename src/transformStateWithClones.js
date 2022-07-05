'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const arrOfClone = [];

  actions.forEach(obj => {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(clone, obj.extraData);
        break;

      case 'removeProperties':
        obj.keysToRemove.forEach(key => {
          delete clone[key];
        });
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }
    arrOfClone.push({...clone});
  });

  return arrOfClone;
}

module.exports = transformStateWithClones;
