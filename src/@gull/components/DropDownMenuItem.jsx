import React, { Component } from "react";
import { classList } from "@utils";
import BasicModal from "app/views/ui-kits/modals/BasicModal";
import FormsWizard from "app/views/forms/FormsWizard";
import { ModalContext, ModalProvider } from "app/providers/ModalContext";

class DropDownMenuItem extends Component {
  state = {
    collapsed: true
  };
  elementRef = React.createRef();

  componentHeight = 0;
  calcaulateHeight(node) {
    if (node.name !== "child") {
      for (let child of node.children) {
        this.calcaulateHeight(child);
      }
    }
    this.componentHeight += node.clientHeight;
    return;
  }
  componentDidMount() {
    this.calcaulateHeight(this.elementRef);

    // OPEN DROPDOWN IF CHILD IS ACTIVE
    // let { location } = this.props;
    // for (let child of this.elementRef.children) {
    //   if (child.getAttribute("href") === location.pathname) {
    //     this.setState({ collapsed: false });
    //   }
    // }
  }
  onItemClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
  
    let { collapsed } = this.state;
    let { children } = this.props;
    let { name, icon,color, child } = this.props.item;


    return (
      <li
        style={{padding: "5px"}}
        className={classList({
          "nav-item dropdown-sidemenu": true,
          open: !collapsed
        })}
      >
        <div onClick={this.onItemClick}   style={{ backgroundColor: color }}>
          <i className={`nav-icon ${icon}`}></i>
          <span className="item-name">{name}</span>
          <i className="dd-arrow i-Arrow-Down"></i>
        </div>

        <ul
          className="submenu"
          ref={el => (this.elementRef = el)}
          style={
            collapsed
              ? { maxHeight: "0px" }
              : { maxHeight: this.componentHeight + "px" }
          }
        >
          {children}
        
          <div style={{marginLeft: "20px"}}>
          <ModalProvider>
             <BasicModal
                centered={true}
                name={`Create a new ${child}`}
              ><FormsWizard child={child} /></BasicModal>
              </ModalProvider>
              </div>
        </ul>
       
      </li>
    );
  }
}

export default DropDownMenuItem;
