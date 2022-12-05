// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Toolbar, AppBar } from "@mui/material";

// project import

import HeaderContent from "./HeaderContent";

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = () => {
  const drawerWidth = 260;
  const theme = useTheme();

  // styled app bar
  const AppBarStyled = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  // common header
  const mainHeader = (
    <Toolbar>
      <HeaderContent />
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    position: "fixed",
    color: "inherit",
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      alignItems: "flex-end",
      // boxShadow: theme.customShadows.z1
    },
  };

  return (
    <>
      (
      <AppBarStyled open={true} {...appBar}>
        {mainHeader}
      </AppBarStyled>
      )
    </>
  );
};

export default Header;
