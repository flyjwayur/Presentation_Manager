const auth = {
  isAuthenticated: false,
  user: {},
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  },
};
export default auth;

const initialState = {
  isAuthenticated: false,
  user: {},
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'SignIn':
      return { ...state, isAuthenticated: true, user: action.payload };
  }
}
