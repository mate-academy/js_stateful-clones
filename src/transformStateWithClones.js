'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
// function transformStateWithClones(state, actions) {
//   const stateCopy = { ...state };

//   const actionsResult = [];

//   for (const ch of actions) {
//     if (ch.type === 'addProperties') {
//       Object.assign(stateCopy, ch.extraData);
//       actionsResult.push(Object.assign({}, stateCopy));
//     };

//     if (ch.type === 'removeProperties') {
//       for (const cn of ch.keysToRemove) {
//         delete (stateCopy[cn]);
//       };
//       actionsResult.push(Object.assign({}, stateCopy));
//     }

//     if (ch.type === 'clear') {
//       for (const cm in stateCopy) {
//         delete (stateCopy[cm]);
//       };
//       actionsResult.push(Object.assign({}, stateCopy));
//     };
//   };

//   return actionsResult;
// }

function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };

  const actionsResult = [];

  const add = 'addProperties';
  const remove = 'removeProperties';
  const clear = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case add:
        Object.assign(stateCopy, action.extraData);
        break;

      case remove:
        for (const cn of action.keysToRemove) {
          delete stateCopy[cn];
        };
        break;

      case clear:
        stateCopy = {};
        break;
    }

    actionsResult.push({ ...stateCopy });
  }

  return actionsResult;
};

module.exports = transformStateWithClones;
