import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function UserMenu() {
  return (
    <Menu>
      <MenuButton as={HamburgerIcon} cursor="pointer" />
      <MenuList>
        <MenuItem as={Link} to="/profile/me/reservations">
          Profile &amp; reservations
        </MenuItem>
        <MenuItem as={Link} to="/profile/account">
          Account
        </MenuItem>
        <MenuItem as={Link} to="/labs">
          Labs
        </MenuItem>
        <MenuItem>Where is teacher?</MenuItem>
      </MenuList>
    </Menu>
  );
}
