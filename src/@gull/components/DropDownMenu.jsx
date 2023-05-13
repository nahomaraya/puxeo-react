import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { classList } from "@utils";
import DropDownMenuItem from "./DropDownMenuItem";
import { ContextMenuTrigger, ContextMenu } from "react-contextmenu";
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

import { ModalProvider } from "app/providers/ModalContext";
import FormsWizard from "app/views/forms/FormsWizard";
import BasicModal from "app/views/ui-kits/modals/BasicModal";
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

class DropDownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
    };
  }

  onItemClick = (e) => {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  };
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderLevels = (items) =>
    items.map((item, i) => {
      const { anchorEl } = this.state;
      const openMenu = Boolean(anchorEl);
      if (item.sub) {
        return (
          <DropDownMenuItem key={i} item={item}>
            {this.renderLevels(item.sub)}
          </DropDownMenuItem>
        );
      } else {
        return (
          <>
            <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <li
                key={i}
                className={classList({
                  "nav-item": true,
                  open: this.state.open,
                })}
                onClick={this.props.closeSecSidenav}
              >
                <a
                  href={`${item.path}`}
                  onClick={(e) => (e.target.style.color = "red")}
                >
                  <i className={`nav-icon ${item.icon}`}></i>
                  <span className="item-name">{item.name}</span>
                </a>
              </li>
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
                  <MenuItem  disableRipple>
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
          </>
        );
      }
    });

  render() {
    return <ul className="childNav">{this.renderLevels(this.props.menu)}</ul>;
  }
}

export default DropDownMenu;
