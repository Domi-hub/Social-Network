export function reducer(state = {}, action) {
    switch (action.type) {
        case "RECEIVE_USERS":
            return Object.assign({}, state, {
                users: action.users
            });
        case "ACCEPT_FRIEND":
            return Object.assign({}, state, {
                users: state.users.map(user => {
                    if (action.userId == user.id) {
                        return {
                            ...user,
                            accepted: true
                        };
                    } else {
                        return user;
                    }
                })
            });
        case "END_FRIENDSHIP":
            return Object.assign({}, state, {
                users: state.users.filter(user => action.userId !== user.id)
            });
        default:
            return state;
    }
}
