import React, { Component } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import Presentation from "../../components/Presentation/Presentation";


export default class Presentations extends Component {
  render() {
    const { isLoading, error, presentations } = this.props;
    console.log("presentations", presentations);

    const renderPresentations = ({match, presentations}) => {
      return presentations.map(presentation => {
        return (
          <Presentation
            key={presentation._id}
            presentation={presentation}
            match={match}
          />
        );
      });
    }
    return (
      <div>
        <p>{presentations.length}</p>
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <Spinner />}
        {presentations.length > 0 && renderPresentations(this.props)}
        {/* <Route
          path={`${this.props.match.path}/:presentationId`}
          component={PresentationWithId}
        /> */}

      </div>
    );
  }
}
