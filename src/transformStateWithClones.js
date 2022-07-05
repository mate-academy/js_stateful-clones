'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const arrOfClone = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete copy[key];
        });
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
    }
    arrOfClone.push({ ...copy });
  });

  return arrOfClone;
}

module.exports = transformStateWithClones;
