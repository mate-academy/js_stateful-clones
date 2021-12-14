'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  let stateClone = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        const keysAdd = Object.keys(actions[i].extraData);
        const valuesAdd = Object.values(actions[i].extraData);

        for (let y = 0; y < keysAdd.length; y++) {
          stateClone[keysAdd[y]] = valuesAdd[y];
        };
        break;

      case 'removeProperties':
        const valuesRemove = Object.values(actions[i].keysToRemove);

        for (let j = 0; j < valuesRemove.length; j++) {
          delete stateClone[valuesRemove[j]];
        };
        break;

      case 'clear':
        for (const keyClear in stateClone) {
          delete stateClone[keyClear];
        };
        break;
    };

    clones.push(stateClone);
    stateClone = { ...clones[i] };
  };

  return clones;
}

module.exports = transformStateWithClones;
