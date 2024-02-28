'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [{ ...state }];

  actions.forEach((value, index) => {
    const newState = { ...newArr[index] };

    switch (value.type) {
      case 'addProperties':
        for (const key in value.extraData) {
          newState[key] = value.extraData[key];
        }
        newArr.push(newState);
        break;

      case 'removeProperties':
        if (value.keysToRemove) {
          value.keysToRemove.forEach((key) => {
            delete newState[key];
          });
        }
        newArr.push(newState);
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        newArr.push(newState);
        break;
    }
  });

  return newArr.slice(1);
}

module.exports = transformStateWithClones;
