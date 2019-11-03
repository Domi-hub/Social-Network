export function reducer(state = {}, action) {
    console.log("state: ", state);
    return state;
}
//action is an object that describes change we want to do in redux
// ... - spread operator is good for making copies of arrays and objects

// state = {
//     ...state
// };

// let arr = [1, 2, 3]
// let newArr = [...arr, 5]

// map - array method. it is a loop that allow us to change all or some items
// in an array. It returns a new array!

//filter - array method. It is a loop, and it is used whenever we need to remove
// and item or items from an array. It returns a new array that does not include
// the items we filterd out!
