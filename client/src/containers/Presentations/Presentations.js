import React, { Component } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import Presentation from "../../components/Presentation/Presentation";


export default class Presentations extends Component {
  render() {
    const { isLoading, error, errorMessage, presentations } = this.props;
    console.log("presentations", presentations);

    const renderPresentations = ({match, presentations}) =>{
      if(presentations.length === 0) {
        return <h1> There is no presentation yet</h1>
      }else if(presentations.length > 0){
        return presentations.map(presentation => {
          return (
            <ul key={presentation._id.toString()}>
            <Presentation
              presentation={presentation}
              match={match}
            />
          </ul>
          );
        });
      }
    }

    return (
      <div>
        <p>{presentations.length}</p>
        {error && <div style={{ color: "#900" }}><div>{errorMessage}</div><div> Could you refresh the page?</div></div>}
        {isLoading && <Spinner />}
        {renderPresentations(this.props)}
        {/* <Route
          path={`${this.props.match.path}/:presentationId`}
          component={PresentationWithId}
        /> */}

      </div>
    );
  }
}
