'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copiedState = { ...state };
  const result = [];

  for (const act of actions) {
    switch (true) {
      case (act.type === 'addProperties') :
        copiedState = {
          ...copiedState, ...act.extraData,
        };
        break;
      case (act.type === 'removeProperties') :
        const listDelete = act.keysToRemove;

        for (const key of listDelete) {
          delete copiedState[key];
        }
        break;
      case (act.type === 'clear') :
        copiedState = {};
        break;
    }

    result.push({ ...copiedState });
  }

  return result;
}

module.exports = transformStateWithClones;
