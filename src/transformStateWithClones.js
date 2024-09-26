'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  let initialElement = Object.assign({}, state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        Object.assign(initialElement, extraData);

        const add = Object.assign({}, initialElement);

        newArray.push(add);
        break;
      }

      case 'removeProperties': {
        for (let i = 0; i < keysToRemove.length; i++) {
          delete initialElement[keysToRemove[i]];
        }

        const remove = Object.assign({}, initialElement);

        newArray.push(remove);
        break;
      }

      case 'clear': {
        initialElement = {};

        const clear = Object.assign({}, initialElement);

        newArray.push(clear);
        break;
      }

      default :
        return 'Unexpected action';
    }
  };

  return newArray;
}

module.exports = transformStateWithClones;
