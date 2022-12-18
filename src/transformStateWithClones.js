'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  for (const act in actions) {
    const type = actions[act].type;

    if (type === 'addProperties') {
      const { extraData } = actions[act];

      Object.assign(copyState, extraData);
      result.push({ ...copyState });
    } else if (type === 'removeProperties') {
      const { keysToRemove } = actions[act];

      keysToRemove.forEach(key => delete copyState[key]);
      result.push({ ...copyState });
    } else {
      Object.keys(copyState).forEach(key => delete copyState[key]);

      result.push({ ...copyState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
