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
    const currentVer = {};

    switch (true) {
      case item.type === 'addProperties':
        Object.assign(stateClone, item.extraData);

        Object.assign(currentVer, stateClone);
        break;

      case item.type === 'removeProperties':
        const removeArray = item.keysToRemove;

        for (const key of removeArray) {
          delete stateClone[key];
        }

        Object.assign(currentVer, stateClone);
        break;

      case item.type === 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }

        Object.assign(currentVer, stateClone);
        break;
    }

    answer.push(currentVer);
  }

  return answer;
}

module.exports = transformStateWithClones;
