'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyProp = Object.assign({}, state);
  const newArr = [];

  for (const actionKey of actions) {
    switch (actionKey.type) {
      case 'addProperties':
        copyProp = {
          ...copyProp,
          ...actionKey.extraData,
        };
        break;

      case 'removeProperties':
        for (const removeKey of actionKey.keysToRemove) {
          delete copyProp[removeKey];
        };
        break;

      case 'clear':
        for (const deleteKey in copyProp) {
          delete copyProp[deleteKey];
        };
        break;
    };

    newArr.push({
      ...copyProp,
    });
  };

  return newArr;
};

module.exports = transformStateWithClones;
