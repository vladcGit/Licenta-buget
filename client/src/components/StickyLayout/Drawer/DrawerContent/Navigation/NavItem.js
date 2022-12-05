import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

// project import

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item, level }) => {
  const theme = useTheme();

  let itemTarget = "_self";

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={item.url} target={itemTarget} />
    )),
  };
  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: "1rem" }} /> : false;

  const textColor = "text.primary";
  const iconSelectedColor = "primary.main";

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        zIndex: 1201,
        pl: `${level * 28}px`,
        py: 1,
        ...{
          "&:hover": {
            bgcolor: "primary.lighter",
          },
          "&.Mui-selected": {
            bgcolor: "primary.lighter",
            borderRight: `2px solid ${theme.palette.primary.main}`,
            color: iconSelectedColor,
            "&:hover": {
              color: iconSelectedColor,
              bgcolor: "primary.lighter",
            },
          },
        },
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: textColor,
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
      {
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ color: textColor }}>
              {item.title}
            </Typography>
          }
        />
      }
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
