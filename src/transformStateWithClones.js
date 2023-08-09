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
    const { extraData, type, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        clones.push(Object.assign({}, clones[clones.length - 1], extraData));
        break;
      case 'removeProperties':
        const currentState = clones[clones.length - 1];

        clones.push(
          Object.keys(currentState).reduce((newState, key) => {
            if (!keysToRemove.includes(key)) {
              newState[key] = currentState[key];
            }

            return newState;
          }, {})
        );
        break;
      case 'clear':
        clones.push({});
        break;
      default:
        break;
    }
  });

  return clones.slice(1);
}

module.exports = transformStateWithClones;
