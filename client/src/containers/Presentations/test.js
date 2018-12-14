componentWillMount() {
  // Loads some users on initial load
  this.loadUsers();
}

loadUsers = () => {
  this.setState({ isLoading: true }, () => {
    request
      .get('https://randomuser.me/api/?results=10')
      .then((results) => {
        // Creates a massaged array of user data
        const nextUsers = results.body.results.map(user => ({
          email: user.email,
          name: Object.values(user.name).join(' '),
          photo: user.picture.medium,
          username: user.login.username,
          uuid: user.login.uuid,
        }));

        // Merges the next users into our existing users
        this.setState({
          // Note: Depending on the API you're using, this value may
          // be returned as part of the payload to indicate that there
          // is no additional data to be loaded
          hasMore: (this.state.users.length < 100),
          isLoading: false,
          users: [
            ...this.state.users,
            ...nextUsers,
          ],
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
          isLoading: false,
        });
      })
  });
}