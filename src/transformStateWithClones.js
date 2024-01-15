'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const prevState = { ...state };
  const transform = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(prevState, action.extraData);
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete prevState[remove];
        }
        break;

      case 'clear':
        for (const clear in prevState) {
          delete prevState[clear];
        }
    }

    transform.push({ ...prevState });
  }

  return transform;
}

module.exports = transformStateWithClones;
