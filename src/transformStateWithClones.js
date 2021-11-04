'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const rezult = [];

  for (const i of actions) {
    let item = {};

    if (rezult[0] === undefined) {
      item = { ...state };
    } else {
      item = { ...rezult[rezult.length - 1] };
    };

    switch (i.type) {
      case 'addProperties':
        Object.assign(item, i.extraData);
        break;

      case 'removeProperties':
        for (const x in i.keysToRemove) {
          delete item[i.keysToRemove[x]];
        }
        break;

      case 'clear':
        for (const x in item) {
          delete item[x];
        }
        break;
    }

    rezult.push(item);
  }

  return rezult;
}

module.exports = transformStateWithClones;
