'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [{ ...state }];

  for (let i = 0; i < actions.length; i++) {
    const valueBeforePassing = i === 0
      ? { ...resultArray[i] }
      : { ...resultArray[i - 1] };

    switch (actions[i].type) {
      case 'addProperties':
        const ADD_PROPERTIES = actions[i].extraData;

        resultArray[i] = Object.assign(valueBeforePassing, ADD_PROPERTIES);
        break;
      case 'removeProperties':
        const ARRAY_ELEMENT_TO_DELETED = actions[i].keysToRemove;

        ARRAY_ELEMENT_TO_DELETED.forEach(removeElement => {
          delete valueBeforePassing[removeElement];
        });
        resultArray[i] = valueBeforePassing;
        break;
      case 'clear':
        resultArray[i] = ({});
        break;
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
