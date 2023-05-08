import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { classList } from "@utils";
import DropDownMenuItem from "./DropDownMenuItem";
import { ContextMenuTrigger, ContextMenu } from "react-contextmenu";

class DropDownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  onItemClick = (e) => {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  };

  renderLevels = (items) =>
    items.map((item, i) => {
      if (item.sub) {
        return (
          <DropDownMenuItem key={i} item={item}>
            {this.renderLevels(item.sub)}
          </DropDownMenuItem>
        );
      } else {
        return (
          <li
            key={i}
            className={classList({
              "nav-item": true,
              open: this.state.open,
            })}
            onClick={this.props.closeSecSidenav}
          >
            <ContextMenuTrigger id={item.id}>
              <NavLink activeClassName="selected" exact to={item.path}>
                <i className={`nav-icon ${item.icon}`}></i>
                <span className="item-name">{item.name}</span>
              </NavLink>
            </ContextMenuTrigger>
            <ContextMenu id={item.id}>
              <ul>
                <li>Context Menu Item 1</li>
                <li>Context Menu Item 2</li>
                <li>Context Menu Item 3</li>
              </ul>
            </ContextMenu>
          </li>
        );
      }
    });

  render() {
    return <ul className="childNav">{this.renderLevels(this.props.menu)}</ul>;
  }
}

export default DropDownMenu;