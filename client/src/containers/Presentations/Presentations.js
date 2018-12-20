import React, { Component } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import Presentation from "../../components/Presentation/Presentation";

export default class Presentations extends Component {
  componentDidMount() {
    this.props.loadPresentations();
  }

  render() {
    const { isLoading, error, errorMessage, presentations } = this.props;

    const renderPresentations = ({ match, presentations }) => {
      if (presentations.length === 0) {
        return <h1> There are no presentations</h1>;
      } else if (presentations.length > 0) {
        return presentations.map(presentation => {
          return (
            <ul key={presentation._id.toString()}>
              <Presentation presentation={presentation} match={match} />
            </ul>
          );
        });
      }
    };

    return (
      <div>
        <p>{presentations.length}</p>
        {error && (
          <div style={{ color: "#900" }}>
            <div>{errorMessage}</div>
            <div> Could you refresh the page?</div>
          </div>
        )}
        {isLoading && <Spinner />}
        {renderPresentations(this.props)}
      </div>
    );
  }
}
