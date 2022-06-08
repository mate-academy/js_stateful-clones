'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = {
    ...state,
  };

  const answer = [];

  for (const item of actions) {
    if (item.type === 'addProperties') {
      Object.assign(stateClone, item.extraData);

      const currentVer = {
        ...stateClone,
      };

      answer.push(currentVer);
    }

    if (item.type === 'removeProperties') {
      const removeArray = item.keysToRemove;

      for (const key of removeArray) {
        delete stateClone[key];
      }

      const currentVer = {
        ...stateClone,
      };

      answer.push(currentVer);
    }

    if (item.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }

      const currentVer = {
        ...stateClone,
      };

      answer.push(currentVer);
    }
  }

  return answer;
}

module.exports = transformStateWithClones;
