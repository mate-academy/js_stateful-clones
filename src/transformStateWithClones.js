'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = Object.assign({}, state);
  const history = [];

  actions.forEach((action) => {
    stateClone = Object.assign({}, stateClone);

    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach((element) => {
          delete stateClone[element];
        });
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }

    history.push(stateClone);
  });

  return history;
}

module.exports = transformStateWithClones;
