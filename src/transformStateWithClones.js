'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
// на выходе должен быть масив с обектами где каждый
// обект то 1 из 3х состояний
function transformStateWithClones(state, actions) {
  // это история изменений и мы ее пишем в масив
  const history = [];
  let lastState = state;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' : {
        const { extraData } = action;
        // клонируем обект в котором стейт и новая инфа
        const newState = {
          ...lastState, ...extraData,
          // ...state, ...extraData,

        };

        // lastState нужен чтобы постоянно обновлять state
        // чтобы мы работали с тем что уже изменилось а не с начальным state
        // так lastState стоит снаружи цикла и при условии с
        // removeProperties в lastState будут результаты других типов
        // а присвоение мы делаем чтобы следующие условия могли
        // работать с результатами этого условия
        lastState = newState;
        history.push(newState);

        break;
      }

      case 'removeProperties' : {
        const { keysToRemove } = action;
        // мы каждый раз делаем доп обект на основе
        // тех что уже были в условиях или на основе state так как
        // let lastState = state;
        const newState = { ...lastState };

        for (const key of keysToRemove) {
          delete newState[key];
        }

        lastState = newState;
        history.push(newState);
        // напрямую к обекту снаружи обращайся
        // history.push({...newState});

        break;
      }

      case 'clear' : {
        lastState = {};
        history.push(lastState);

        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }
  }

  return history;
}

// console.log(transformStateWithClones({
//   foo: 'bar', bar: 'foo',
// }, [{
//   type: 'addProperties',
//   extraData: {
//     name: 'Jim', hello: 'world',
//   },
// },
// {
//   type: 'removeProperties', keysToRemove: ['bar', 'hello'],
// },
// {
//   type: 'addProperties', extraData: { another: 'one' },
// }]));

// test('Should handle multiple types', () => {
//   const state = {
//     foo: 'bar', bar: 'foo',
//   };

//   expect(transformStateWithClones(state, [
//     {
//       type: 'addProperties',
//       extraData: {
//         name: 'Jim', hello: 'world',
//       },
//     },
//     {
//       type: 'removeProperties', keysToRemove: ['bar', 'hello'],
//     },
//     {
//       type: 'addProperties', extraData: { another: 'one' },
//     },
//   ]))
//     .toEqual([
//       {
//         foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world',
//       },
//       {
//         foo: 'bar', name: 'Jim',
//       },
//       {
//         foo: 'bar', name: 'Jim', another: 'one',
//       },
//     ]);

//   // expect(state)
//   //   .toEqual({
//   //     foo: 'bar', bar: 'foo',
//   //   });
// });

module.exports = transformStateWithClones;
