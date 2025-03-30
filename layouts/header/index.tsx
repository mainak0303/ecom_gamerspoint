import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { keyframes } from "@emotion/react";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { useUserStore } from "@/toolkit/store/store";

const glow = keyframes`
  0% {
    text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #ff0000;
  }
  50% {
    text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 80px #ff0000;
  }
  100% {
    text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #ff0000;
  }
`;

const pages = ["Home", "Products", "About Us", "Contact Us"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const { token, logout } = useUserStore();
  const isLoggedIn = !!token;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      toast.success("Logged out successfully");
      setLoading(false);
      router.push("/auth/login");
    }, 2000);
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/auth/login");
      setLoading(false);
    }, 2000);
  };

  const settings = [
    { name: "Dashboard", link: "/auth/dashboard" },
    { name: "UpdatePassword", link: "/auth/update_password" },
    { name: "Create", link: "/cms/create" },
    { name: "Products", link: "/cms/list" },
    {
      name: isLoggedIn ? "Logout" : "Login",
      link: isLoggedIn ? "" : "/auth/login",
    },
  ];

  return (
    <>
      {/* Show loader when loading */}
      {loading && <Loader />}

      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(45deg, #8B0000, #FF0000)",
          boxShadow: "0 4px 15px rgba(255, 0, 0, 0.5)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "#FFD700",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#FFD700",
                textDecoration: "none",
                animation: `${glow} 2s infinite`,
              }}
            >
              GamERSPOiNT
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: "#FFD700" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link
                      href={
                        page === "Home"
                          ? "/"
                          : page === "Products"
                          ? "/cms/list"
                          : page === "About Us"
                          ? "/aboutUs"
                          : "/contactUs"
                      }
                      passHref
                    >
                      <Typography
                        sx={{ textAlign: "center", color: "#8B0000" }}
                      >
                        {page}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <AdbIcon
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                color: "#FFD700",
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#FFD700",
                textDecoration: "none",
                animation: `${glow} 2s infinite`,
              }}
            >
              GamERSPOiNT
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  key={page}
                  href={
                    page === "Home"
                      ? "/"
                      : page === "Products"
                      ? "/cms/list"
                      : page === "About Us"
                      ? "/aboutUs"
                      : "/contactUs"
                  }
                  passHref
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "#FFD700",
                      display: "block",
                      textTransform: "none",
                      "&:hover": {
                        color: "#FFFFFF",
                        background: "rgba(255, 255, 255, 0.1)",
                        transform: "scale(1.1)",
                        transition: "all 0.3s ease",
                      },
                      textDecoration: "none",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/2.jpg"
                    sx={{ border: "2px solid #FFD700" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={
                      setting.name === "Logout"
                        ? handleLogout
                        : setting.name === "Login"
                        ? handleLogin
                        : () => {
                            router.push(setting.link);
                            handleCloseUserMenu();
                          }
                    }
                  >
                    <Typography sx={{ textAlign: "center", color: "#8B0000" }}>
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default ResponsiveAppBar;
