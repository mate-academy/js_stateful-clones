'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const container = [];
  let clones = Object.assign({}, state);

  for (const operation of actions) {
    let newClone = Object.assign({}, clones);

    switch (operation.type) {
      case 'addProperties':
        Object.assign(newClone, operation.extraData);
        break;

      case 'removeProperties':
        for (const property in operation.keysToRemove) {
          delete newClone[operation.keysToRemove[property]];
        };
        break;

      case 'clear':
        newClone = {};
        break;

      default:
        break;
    };

    clones = newClone;
    container.push(newClone);
  };

  return container;
};

module.exports = transformStateWithClones;
