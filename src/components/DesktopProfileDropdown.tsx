import { Menu, MenuItem, Avatar, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { createElement, useState } from 'react';
import { ArrowDown2, Icon } from 'iconsax-react';
import DummyProfile from "/images/avatar.png";
import { I24Support, Setting } from "iconsax-react";
import { LogOutIcon } from './Icons';

const menuSx = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    p: 2,
    borderRadius: 2,
    width: "100%",
    transition: 'all 0.15s',
    '&:hover': {
        bgcolor: 'aciu.lightGrey',
        boxShadow: '0px 1px 2px rgba(13,13,18,0.04), 0px 1px 3px rgba(13,13,18,0.05)',
    },
}

const profileRoutes: ProfileRoute[] = [
    {
        path: "/support",
        label: "Help Center",
        icon: I24Support,
    },
    {
        path: "/settings",
        label: "Settings",
        icon: Setting,
    },
]

interface ProfileRoute {
    label: string; 
    icon: Icon, 
    path: string
}

export default function DesktopProfileDropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
        <button className="flex items-center gap-2.5" onClick={handleOpen}>
            <Avatar src={DummyProfile} className="rounded-[3.125rem] w-8 h-8" />
            <ArrowDown2 size={18} color="#BFBFBF" className={open ? "rotate-180" : ""}/>
        </button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
        paper: {
            sx: {
                minWidth: 262,
                borderRadius: "1.25rem",
                p: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
            },
        },
  }}
      >
        {profileRoutes.map(({ label, icon, path }: ProfileRoute, index) => (
          <MenuItem
            key={index}
            component={NavLink}
            to={path}
            onClick={handleClose}
            sx={menuSx}
            >
                {icon && createElement(icon, { size: 24 })}
                <span className="text-aciu-border-grey font-coolvetica leading-[1.55] tracking-[5%]">{label}</span>
            </MenuItem>
        ))}
        <MenuItem
            component={Button}
            onClick={handleClose}
            sx={menuSx}
        >
            <LogOutIcon className="size-6" />
            <span className="font-coolvetica leading-[1.55] tracking-[5%] text-[#F72A30] capitalize">Sign Out</span>
        </MenuItem>
      </Menu>
    </>
  );
}