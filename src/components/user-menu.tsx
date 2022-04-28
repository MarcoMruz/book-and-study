import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/use-fetch";
import { apiUrl } from "../routes/profile/me";

export function UserMenu() {
  const { data } = useFetch<{ user: { isTeacher: boolean } }>(
    `${apiUrl}/profile/me`
  );

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
        {data?.user?.isTeacher && (
          <MenuItem as={Link} to="/profile/create-lab">
            Create lab
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
