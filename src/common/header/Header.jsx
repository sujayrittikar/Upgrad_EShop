import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "16ch",
      },
    },
  },
}));

const drawerWidth = 240;
const ITEM_HEIGHT = 30;

function Header({ role, window, clickAddAddress, clickAddProduct }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [alignment, setAlignment] = useState("default");
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchor = Boolean(anchorEl);

  const handleClickAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    localStorage.setItem("filter", newAlignment);
  };

  useEffect(() => {
    localStorage.setItem("filter", alignment);
  }, [alignment]);

  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <Typography variant="h6" gutterBottom>
          Filter
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          orientation="vertical"
          aria-label="Platform"
        >
          <ToggleButton value="default">Default</ToggleButton>
          <ToggleButton value="low-to-high">Low to High</ToggleButton>
          <ToggleButton value="high-to-low">High to Low</ToggleButton>
          <ToggleButton value="newest">Newest</ToggleButton>
        </ToggleButtonGroup>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Eshop Upgrad
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={openAnchor ? "long-menu" : undefined}
              aria-expanded={openAnchor ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClickAnchor}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={openAnchor}
              onClose={handleCloseAnchor}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {role === "admin" && (
                <MenuItem
                  onClick={() => {
                    handleCloseAnchor();
                    clickAddProduct();
                  }}
                >
                  Add Product
                </MenuItem>
              )}
              {role === "user" && (
                <MenuItem
                  onClick={() => {
                    handleCloseAnchor();
                    clickAddAddress();
                  }}
                >
                  Add Address
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  handleCloseAnchor();
                  handleLogOut();
                }}
              >
                Logout
                <ExitToAppIcon sx={{ ml: 1 }} />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Header;
