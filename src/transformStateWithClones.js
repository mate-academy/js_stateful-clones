'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone1 = { ...state };
  const clonesArray = [];

  for (let key = 0; key < actions.length; key++) {
    if (actions[key].type === 'addProperties') {
      Object.assign(clone1, actions[key].extraData);
    } else if (actions[key].type === 'removeProperties') {
      for (let i = 0; i < actions[key].keysToRemove.length; i++) {
        delete clone1[`${actions[key].keysToRemove[i]}`];
      }
    } else if (actions[key].type === 'clear') {
      for (const j in clone1) {
        delete clone1[j];
      }
    }

    const clone2 = { ...clone1 };

    clonesArray.push(clone2);
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
