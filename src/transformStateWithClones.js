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

    if (operation.type === 'addProperties') {
      container.push(Object.assign(newClones, operation.extraData));
    };

    if (operation.type === 'removeProperties') {
      for (const property in operation.keysToRemove) {
        delete newClones[operation.keysToRemove[property]];
      };
      container.push(newClones);
    };

    if (operation.type === 'clear') {
      for (const property in newClones) {
        delete newClones[property];
      };
      container.push(newClones);
    };

    clones = newClones;
  };

  return container;
};

module.exports = transformStateWithClones;
