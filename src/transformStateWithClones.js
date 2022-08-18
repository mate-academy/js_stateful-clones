'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let copy = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let saveAction = {};

    switch (action.type) {
      case 'addProperties' :
        copy = Object.assign(copy, action.extraData);
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete copy[key];
        };
        break;

      case 'clear' :
        for (const key1 in copy) {
          delete copy[key1];
        }
        break;
    };

    saveAction = Object.assign(saveAction, copy);
    result.push(saveAction);
  }

  return result;
}

module.exports = transformStateWithClones;
