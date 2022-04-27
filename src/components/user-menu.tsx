import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function UserMenu() {
  return (
    <Menu>
      <MenuButton as={HamburgerIcon} />
      <MenuList>
        <MenuItem as={Link} to="/profile/me">
          Profile
        </MenuItem>
        <MenuItem as={Link} to="/profile/account">
          Account
        </MenuItem>
        <MenuItem as={Link} to="/reservations/me">
          My reservations
        </MenuItem>
        <MenuItem as={Link} to="/reservations/reserve-lab">
          Reserve lab
        </MenuItem>
        <MenuItem>Where is teacher?</MenuItem>
      </MenuList>
    </Menu>
  );
}
