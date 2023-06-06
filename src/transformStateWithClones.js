'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const changes = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'removeProperties':
        const { keysToRemove } = action;

        for (const keyRemove of keysToRemove) {
          delete cloneState[keyRemove];
        }

        const clone = { ...cloneState };

        changes.push(clone);

        break;

      case 'addProperties':
        const { extraData } = action;

        const objClone = Object.assign(cloneState, extraData);

        const newClone = { ...objClone }

        changes.push(newClone);

        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }

        changes.push({ ...cloneState });

        break;
    }
  }

  return changes;
}

module.exports = transformStateWithClones;
