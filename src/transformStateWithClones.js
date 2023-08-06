'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [Object.assign({}, state)];

  actions.forEach((action) => {
    const { extraData } = action;

    if (extraData) {
      clones.push(Object.assign({}, clones[clones.length - 1], extraData));
    } else if (action.type === 'removeProperties') {
      const { keysToRemove } = action;
      const currentState = clones[clones.length - 1];

      clones.push(
        Object.keys(currentState).reduce((newState, key) => {
          if (!keysToRemove.includes(key)) {
            newState[key] = currentState[key];
          }

          return newState;
        }, {})
      );
    } else if (action.type === 'clear') {
      clones.push({});
    }
  });

  return clones.slice(1);
}

module.exports = transformStateWithClones;
