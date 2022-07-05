'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const arrOfClone = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete copyState[key];
        });
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }
    arrOfClone.push({ ...copyState });
  });

  return arrOfClone;
}

module.exports = transformStateWithClones;
