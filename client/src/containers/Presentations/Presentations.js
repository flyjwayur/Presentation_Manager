import React, { Component } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import Presentation from "../../components/Presentation/Presentation";

export default class Presentations extends Component {

  renderPresentations = ({ match, history, presentations }) => {
    return presentations.length > 0 ? (
      presentations.map(presentation => {
        return (
          <ul key={presentation._id.toString()}>
            <Presentation presentation={presentation} match={match} history={history} deletePresentation={this.props.deletePresentation} />
          </ul>
        );
      })
    ) : (
      <h1> There are no presentations</h1>
    );
  };

  render() {
    const { isLoading, error, presentations } = this.props;
    return (
      <div>
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
