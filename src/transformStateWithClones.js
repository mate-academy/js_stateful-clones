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
        break;

      case 'removeProperties' :
        action.keysToRemove.forEach(key => delete tempSTate[key]);
        break;

      case 'clear' :
        Object.keys(tempSTate).forEach(key => delete tempSTate[key]);
        break;

      default :
        throw new Error(`Action ${action.type} is unknown!`);
    }
    array.push({ ...tempSTate });
  }

  return array;
}

module.exports = transformStateWithClones;
