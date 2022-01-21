'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ('addProperties') :
        Object.assign(copyState, extraData);
        break;

      case ('removeProperties') :
        for (const key of keysToRemove) {
          delete copyState[key];
        }
        break;

      case ('clear') :
        Object.keys(copyState).map(key => delete copyState[key]);
        // for (const key in state) {
        //   delete state[key];
        // }
        break;

      default : ;
    }

    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
