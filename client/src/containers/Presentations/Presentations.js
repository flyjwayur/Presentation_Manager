import React, { Component } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import Presentation from "../../components/Presentation/Presentation";
import { Link } from "react-router-dom";

export default class Presentations extends Component {
  renderPresentations = ({ match, history, presentations }) => {
    if (presentations.length > 0) {
      return presentations.map(presentation => {
        return (
          <ul key={presentation._id.toString()}>
            <Presentation
              presentation={presentation}
              match={match}
              history={history}
              deletePresentation={this.props.deletePresentation}
            />
          </ul>
        );
      });
    } else if (presentations.length === 0) {
      return <h1> There are no presentations</h1>;
    } else {
      return null;
    }
  };

  render() {
    const { isLoading, error, presentations } = this.props;
    return (
      <div>
        <Link to="/">
          <button>Go back</button>
        </Link>
        <p>{presentations.length}</p>
        {/* Handle errors */}
        {error && (
          <div style={{ color: "#900" }}>
            <div>{error}</div>
            <div> Could you refresh the page?</div>
          </div>
        )}
        {/* Handle loading presentation data */}
        {isLoading && <Spinner />}
        {/* Render presentations */}
        {this.renderPresentations(this.props)}
      </div>
    );
  }
}
