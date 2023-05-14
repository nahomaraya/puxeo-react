import React, { Component } from "react";
import { classList } from "@utils";
import BasicModal from "app/views/ui-kits/modals/BasicModal";
import FormsWizard from "app/views/forms/FormsWizard";
import { ModalContext, ModalProvider } from "app/providers/ModalContext";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

class DropDownMenuItem extends Component {
  state = {
    collapsed: true,
    anchorEl: null,
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
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    let { collapsed } = this.state;
    let { children } = this.props;
    let { name, icon, color, child } = this.props.item;
    const { anchorEl } = this.state;
    const openMenu = Boolean(anchorEl);

    return (
      <li
        style={{ padding: "5px" }}
        className={classList({
          "nav-item dropdown-sidemenu": true,
          open: !collapsed,
        })}
      >
        <div
          onClick={this.onItemClick}
          style={{
            backgroundColor: color,
            display: "flex",
            alignItems: "start",
          }}
        >
           <i
            className="dd-arrow i-Arrow-Down"
            style={{ marginRight: "20px" }}
          ></i>
          <i className={`nav-icon ${icon}`}></i>
          <span className="item-name">{name}</span>
         

          <div>
            <IconButton
              id="demo-customized-button"
              aria-controls={openMenu ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={this.handleClick}
            >
              <MoreHorizIcon />
            </IconButton>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={this.handleClose}
            >
              <MenuItem disableRipple>
                <EditIcon />

                <ModalProvider>
                  <BasicModal
                    centered={true}
                    name={`Create a new ${"project"}`}
                  >
                    <FormsWizard child={"project"} />
                  </BasicModal>
                </ModalProvider>
              </MenuItem>
              <MenuItem onClick={this.handleClose} disableRipple>
                <FileCopyIcon />
                Duplicate
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={this.handleClose} disableRipple>
                <ArchiveIcon />
                Archive
              </MenuItem>
              <MenuItem onClick={this.handleClose} disableRipple>
                <MoreHorizIcon />
                More
              </MenuItem>
            </StyledMenu>
          </div>
        </div>

        <ul
          className="submenu"
          ref={(el) => (this.elementRef = el)}
          style={
            collapsed
              ? { maxHeight: "0px" }
              : { maxHeight: this.componentHeight + "px" }
          }
        >
          {children}

          {/* <div style={{marginLeft: "20px"}}>
          <ModalProvider>
             <BasicModal
                centered={true}
                name={`Create a new ${child}`}
              ><FormsWizard child={child} /></BasicModal>
              </ModalProvider>
              </div> */}
        </ul>
      </li>
    );
  }
}

export default DropDownMenuItem;
