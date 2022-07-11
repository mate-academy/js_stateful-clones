'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const rezult = [];
  let changearray = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const typeAction = action.type;

    if (rezult.length > 0) {
      changearray = { ...rezult[i - 1] };
    }

    switch (typeAction) {
      case 'addProperties':
        Object.assign(changearray, action.extraData);
        break;

      case 'clear':
        for (const key in changearray) {
          delete changearray[key];
        };
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete changearray[keyToRemove];
        }
        break;
      default:
        break;
    }

    rezult.push(changearray);
  }

  return rezult;
}

module.exports = transformStateWithClones;
