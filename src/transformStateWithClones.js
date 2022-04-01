'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i]['type']) {
      case 'addProperties':
        Object.assign(cloneState, actions[i]['extraData']);
        break;

      case 'removeProperties':
        for (let x = 0; x < actions[i]['keysToRemove'].length; x++) {
          delete cloneState[actions[i]['keysToRemove'][x]];
        }
        break;

      case `clear`:
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;
    }

    const clone2 = { ...cloneState };

    result.push(clone2);
  }

  return result;
}

module.exports = transformStateWithClones;
