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

  for (const act in actions) {
    const operation = actions[act];
    const newClones = Object.assign({}, clones);

    switch (operation.type) {
      case 'addProperties':
        container.push(Object.assign(newClones, operation.extraData));
        break;

      case 'removeProperties':
        for (const property in operation.keysToRemove) {
          delete newClones[operation.keysToRemove[property]];
        };
        container.push(newClones);
        break;

      case 'clear':
        for (const property in newClones) {
          delete newClones[property];
        };
        container.push(newClones);
        break;

      default:
        break;
    };

    clones = newClones;
  };

  return container;
};

module.exports = transformStateWithClones;
