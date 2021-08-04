'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function actionstateWithClones(state, actions) {
  const clonesArr = [];
  const clone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(clone, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete clone[key];
        }
        break;
      }

      case 'clear': {
        for (const key in clone) {
          delete clone[key];
        }
        break;
      }
    }
    clonesArr.push({ ...clone });
  }

  return clonesArr;
}

module.exports = actionstateWithClones;
