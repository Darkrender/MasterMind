import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Dropdown, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: props.auth.getProfile()
    }

    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }

  logout() {
    this.props.auth.logout();
    this.setState({profile: null})
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to='/'>
              <a>MegaMind</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown eventKey={3} title="Games" id="basic-nav-dropdown">
              <LinkContainer to='/scramblegame'>
                <MenuItem eventKey={3.1}>Scramble</MenuItem>
              </LinkContainer>
              <LinkContainer to='/nback'>
                <MenuItem eventKey={3.2}>N-Back</MenuItem>
              </LinkContainer>
              <LinkContainer to='/phaser'>
                <MenuItem eventKey={3.1}>Jimmy's Epic Phaser Game</MenuItem>
              </LinkContainer>
              <LinkContainer to='/renata'>
                <MenuItem eventKey={3.1}>Renata's Sweet Game</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem style={this.state.profile ? {display: 'none'} : {display: ''}} onClick={this.props.auth.login.bind(this)} eventKey={1}>Login</NavItem>
            <div style={this.state.profile ? {display: ''} : {display: 'none'}}>
              <Dropdown id="profile-dropdown">
                <Dropdown.Toggle>
                  <Glyphicon glyph="user" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <LinkContainer to='/profile'>
                    <MenuItem eventKey={4.1}>Profile</MenuItem>
                  </LinkContainer>
                  <LinkContainer to='/leaderboard'>
                    <MenuItem eventKey={4.2}>LeaderBoard</MenuItem>
                  </LinkContainer>
                  <MenuItem onClick={this.logout.bind(this)}>Logout</MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
}
