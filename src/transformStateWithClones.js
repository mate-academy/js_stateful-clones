'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const array = [];
  const tempSTate = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(tempSTate, action.extraData);
        array.push({ ...tempSTate });
        break;

      case 'removeProperties' :
        for (const item of action.keysToRemove) {
          delete tempSTate[item];
        }
        array.push({ ...tempSTate });
        break;

      case 'clear' :
        for (const key in tempSTate) {
          delete tempSTate[key];
        }
        array.push({ ...tempSTate });
        break;

      default :
        return array;
    }
  }

  return array;
}

module.exports = transformStateWithClones;
