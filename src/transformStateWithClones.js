'use strict';

function transformStateWithClones(state, actions) {
  let arr = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      let prev = i === 0 ? { ...state } : { ...arr[i - 1] };
      let suporte = Object.assign({}, prev, actions[i].extraData); 
      arr[i] = suporte;

    } else if (actions[i].type === 'removeProperties') {
      let clone = i === 0 ? { ...state } : { ...arr[i - 1] };

      for (let o = 0; o < actions[i].keysToRemove.length; o++) {
        const key = actions[i].keysToRemove[o];
        delete clone[key];
      }

      arr[i] = clone;

    } else if (actions[i].type === "clear") {
      arr[i] = {};
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
