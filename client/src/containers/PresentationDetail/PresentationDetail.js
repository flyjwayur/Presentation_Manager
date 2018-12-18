import React, { Component, Fragment } from "react";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import PresentationForms from "../../components/PresentationForms/PresentationForms";
import { Redirect, Link} from "react-router-dom";

class PresentationDetail extends Component {
  state = {
    singlePresentation: null,
    isLoading: false,
    error: false,
    errorMessage: "",
    //editable: false
  };

  componentDidMount() {
    console.log("detail mounted")
    this.loadSinglePresentation(this.props);
  }

  loadSinglePresentation = ({match}) => {
    this.setState({ isLoading: true }, () => {
      axios
        .get("/presentations/" + match.params.presentationId)
        .then(response => {
          let singlePresentation = response.data;
          console.log("get single presentation", singlePresentation);
          this.setState({
            isLoading: false,
            singlePresentation: singlePresentation
          });
          //this.props.updateSinglePresentation(singlePresentation);
        })
        .catch(error => {
          console.log("error from detail", error);
          this.setState({
            error: true,
            errorMessage: error.response.data
          });
        });
    });
  };

  enableEdit = e => {
    this.props.history.push(`/presentations/${this.props.match.params.presentationId}/edit`);
    //this.setState({ editable: true });
  };

  // disableEdit = e => {
  //   this.setState({editable: false })
  // }

  render() {
    const {
      editable,
      error,
      errorMessage,
      isLoading,
      singlePresentation,
    } = this.state;
    const { history , match } = this.props;
    console.log("render from detail", this.props);

    const displayDetail = () => {
      if (singlePresentation) {
        const {
          presenter,
          evaluator,
          topic,
          article,
          keywords,
          date,
          summary
        } = singlePresentation;
        return (
          <div>
            <p>
              <span>Presenter: </span>
              {presenter}
            </p>
            <p>
              <span>Evaluator: </span>
              {evaluator}
            </p>
            <p>
              <span>Topic: </span>
              {topic}
            </p>
            <p>
              <span>Article: </span>
              {article}
            </p>
            <p>
              <span>Keywords: </span>
              {keywords}
            </p>
            <p>
              <span>Date: </span>
              {date}
            </p>
            <p>
              <span>Summary: </span>
              {summary}
            </p>
            <button> Detail </button>
            <button onClick={e => this.enableEdit(e)}>Edit</button>
          </div>       
        );
      } else {
        return null;
      }
    };

    return (
      <Fragment>
        {error && (
          <div style={{ color: "#900" }}>
            <div>{errorMessage.title}</div>
          </div>
        )}
        {isLoading && <Spinner />}
        {/* { editable ? (
          <PresentationForms
            editable={editable}
            singlePresentation={singlePresentation}
            disableEdit={this.disableEdit}
            history={history}
            presentationId={match.params.presentationId}
          />
        ) : displayDetail() } */}
        {displayDetail()}
      </Fragment>
    );
  }
}

export default PresentationDetail;
