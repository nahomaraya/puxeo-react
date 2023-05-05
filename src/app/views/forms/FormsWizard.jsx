import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import StepWizard from "react-step-wizard";
import FormWizardNav from "./FormWizardNav";
import { Button } from "react-bootstrap";
import FormBasic from "./FormBasic";
import { SpaceForm, ColorSelector, StatusAdder, Summary } from "./SpaceForm";
import { ModalContext } from "app/providers/ModalContext";


class FormsWizard extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      color: "#000000",
      statuses: [],
     
    };

    this.setName = this.setName.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setStatuses = this.setStatuses.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setName(name) {
    console.log(name)
    this.setState({ name });
  }

  setColor(color) {
    this.setState({ color });
  }

  setStatuses(statuses) {
    this.setState({ statuses });
  }
  handleSubmit() {
    console.log("Submitted")
    console.log(this.state.name)
    console.log(this.state.color)
   
   

    // Make a POST request to the API endpoint with the form data
    fetch("/api/resource/Spaces", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        name1: this.state.name,
        color: this.state.color,
       // statuses: statuses,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Reset the form state after submission
        this.setState({
          name: "",
          color: "#000000",
          statuses: [],
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    
    
    return (
      <div>
        {/* <Breadcrumb
          routeSegments={[
            { name: "Forms", path: "/forms" },
            { name: "Forms Wizard" }
          ]}
        ></Breadcrumb> */}
        <div className="row">
          <div className="col-md-12">
            <StepWizard
              nav={<FormWizardNav />}
              initialStep={1}
              isHashEnabled={true}
            >
              {/* this is just for example, add your own component here */}

              <FirstComponent hashkey={"first"}>
              <div >
                <SpaceForm name={this.state.name} setName={this.setName} child={this.props.child} />
                </div>
              </FirstComponent>
              <FirstComponent hashkey={"second"}>
              <div>
                <ColorSelector
                  color={this.state.color}
                  setColor={this.setColor}
                />
              </div>
              </FirstComponent>
              <FirstComponent hashkey={"third"}>
              <div >
                <StatusAdder
                  statuses={this.state.statuses}
                  setStatuses={this.setStatuses}
                />
                </div> 
              </FirstComponent>
              <FirstComponent hashkey={"fourth"} handleSubmit={this.handleSubmit}>
              <div >
                <Summary
                  name={this.state.name}
                  color={this.state.color}
                  statuses={this.state.statuses}
                />
              </div>
              </FirstComponent>
            </StepWizard>
          </div>
        </div>
      </div>
    );
  }
}

export default FormsWizard;

class FirstComponent extends Component {
  static contextType = ModalContext;
  state = {};
  handleCancel = () => {
    this.props.firstStep();
    this.props.onCancel();
  };
  render() {
    const { showModal, setShowModal } = this.context;
    let {
      nextStep,
      previousStep,
      lastStep,
      firstStep,
      currentStep,
      totalSteps,
    } = this.props;

    return (
      <div>
        {this.props.children}

        <div className="d-flex justify-content-end">
          <Button
            className="mx-2"
            variant="danger"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={currentStep === 1}
            className="mx-1"
            variant="info"
            onClick={previousStep}
          >
            Previous
          </Button>
          <Button
            disabled={currentStep === totalSteps}
            className="mx-1"
            variant="info"
            onClick={nextStep}
          >
            Next
          </Button>
          <Button
            disabled={false}
            className="mx-1"
            variant="primary"
            onClick={() => {
              lastStep();
              this.props.handleSubmit(); // call the handleSubmit function
            }}
          >
            Finish
          </Button>
        </div>
      </div>
    );
  }
}
