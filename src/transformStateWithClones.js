'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedState = { ...state };
  const finalArr = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(clonedState, obj.extraData);
    };

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete clonedState[key];
      };
    };

    if (obj.type === 'clear') {
      for (const key of Object.keys(clonedState)) {
        delete clonedState[key];
      };
    };

    finalArr.push({ ...clonedState });
  };

  return finalArr;
};

module.exports = transformStateWithClones;
