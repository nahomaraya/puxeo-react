import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import StepWizard from "react-step-wizard";
import FormWizardNav from "./FormWizardNav";

import { Modal, Button } from "react-bootstrap";
import FormBasic from "./FormBasic";
import {
  SpaceForm,
  ColorSelector,
  StatusAdder,
  Summary,
  ConfirmationPage,
} from "./SpaceForm";
import { ModalContext } from "app/providers/ModalContext";

class FormsWizard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      color: "#000000",
      statuses: [],
      selectedOption: "Use Space Statuses"
    };

    this.setName = this.setName.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setStatuses = this.setStatuses.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setName(name) {
    console.log(name);
    this.setState({ name });
  }

  setColor(color) {
    this.setState({ color });
  }

  setStatuses(statuses) {
    this.setState({ statuses });
  }
  setSelectedOption(selectedOption){
    this.setSelectedOption(selectedOption)
  }
  handleSubmit() {
    console.log("Submitted");
    console.log(this.state.name);
    console.log(this.state.color);
    console.log(this.state.statuses);
    console.log(this.props.child)
  
    if (this.props.child === "space") {
      // Make a POST request to create the "Spaces" document
      fetch("/api/resource/Spaces", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name1: this.state.name,
          color: this.state.color,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Space created:", data);
  
          // Create an array of "Puxeo Status" documents to be created
          const createStatus = (statusData) => {
            console.log(statusData);
            return fetch("/api/resource/Puxeo Statuses", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(statusData),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                console.log(response.json);
                return response.json();
              })
              .then((data) => {
                console.log("Success:", data);
                return data;
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          };
  
          const statusesData = this.state.statuses.map((status) => {
            return {
              name1: status.name,
              color: status.color,
              is_custom: 0,
              space: data.data.name,
            };
          });
  
          const promises = statusesData.map((statusData) => {
            console.log(statusData);
            return createStatus(statusData);
          });
  
          Promise.all(promises)
            .then((results) => {
              console.log(results);
              console.log("All statuses created:", results);
            })
            .catch((error) => {
              console.error("Error creating statuses:", error);
            });
  
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
    } else if (this.props.child === "project") {
      // Determine whether to use custom statuses or not
      const isCustomStatuses = this.state.selectedOption !== "Use Space Statuses";
  
      // Make a POST request to create the "Project" document
      fetch("/api/resource/Project", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: this.state.name,
          status: "Open",
          project_status: "Open",
          color: this.state.color,
          is_custom: !isCustomStatuses, // Set is_custom based on selectedOption
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Project created:", data);
  
          // Create an array of "Puxeo Status" documents to be created
          const createStatus = (statusData) => {
            console.log(statusData);
            return fetch("/api/resource/Puxeo Statuses", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(statusData),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                console.log(response.json);
                return response.json();
              })
              .then((data) => {
                console.log("Success:", data);
                return data;
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          };
  
          // Create status documents if using custom statuses
          if (isCustomStatuses) {
            const statusData = this.state.statuses.map((status) => {
              return {
                name1: status.name,
                color: status.color,
                is_custom: 1,
                project: data.data.name,
              };
            });
  
            const promises = statusData.map((statusData) => {
              return createStatus(statusData);
            });
  
            Promise.all(promises)
              .then((results) => {
                console.log(results);
                console.log("All status created:", results);
              })
              .catch((error) => {
                console.error("Error creating tasks:", error);
              });
          }
  
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
                <div>
                  <SpaceForm
                    name={this.state.name}
                    setName={this.setName}
                    child={this.props.child}
                  />
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
                <div>
                  <StatusAdder
                    statuses={this.state.statuses}
                    setStatuses={this.setStatuses}
                    setSelectedOption={this.setSelectedOption}
                  />
                </div>
              </FirstComponent>
              <FirstComponent
                hashkey={"fourth"}
                handleSubmit={this.handleSubmit}
              >
                <div>
                  <Summary
                    name={this.state.name}
                    color={this.state.color}
                    statuses={this.state.statuses}
                  />
                </div>
              </FirstComponent>
              {/* <FirstComponent hashkey={"fifth"} handleSubmit={this.handleSubmit}>
              <div >
                <ConfirmationPage  child={this.props.child} />
              </div>
              </FirstComponent> */}
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
  state = {
    showConfirmationModal: false,
  };
  handleCancel = () => {
    this.props.firstStep();
    this.props.onCancel();
  };
  handleFinish = () => {
    this.props.handleSubmit();
    this.setState({ showConfirmationModal: true });
  };
  handleCloseConfirmationModal = () => {
    this.setState({ showConfirmationModal: false });
    this.props.lastStep();
    this.context.setShowModal(false);
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
            onClick={this.handleFinish}
          >
            Finish
          </Button>
        </div>

        <Modal
          show={this.state.showConfirmationModal}
          onHide={this.handleCloseConfirmationModal}
        >
          <Modal.Body className="text-center">
            <i
              className="fa fa-check-circle text-success mb-3"
              style={{ fontSize: "3rem" }}
            ></i>
            <p>Action completed successfully!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.handleCloseConfirmationModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
