'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'removeProperties':
        for (const removeKeys of action.keysToRemove) {
          delete copy[removeKeys];
        }
        break;

      case 'clear':
        copy = {};
        break;
    }
    // console.log(copy);
    // console.log({...copy});
    result.push({...copy});
  }

  return result;
}

module.exports = transformStateWithClones;
