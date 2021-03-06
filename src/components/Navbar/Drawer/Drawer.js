import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TheatersIcon from "@material-ui/icons/Theaters";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { Link } from "react-router-dom";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import InfoIcon from "@material-ui/icons/Info";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import HistoryIcon from '@material-ui/icons/History';
import TwoWheelerIcon from '@material-ui/icons/TwoWheeler';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/showing" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText secondary="Showing" />
            <ListItemIcon>
              <TheatersIcon />
            </ListItemIcon>
          </ListItem>
        </Link>

        <Link to="/orderForm" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText secondary="Booking" />
            <ListItemIcon>
              <MovieFilterIcon />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link to="/orderHistory" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText secondary="Booking History" />
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link to="/best-movies" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText secondary="Best Movies" />
            <ListItemIcon>
              <TwoWheelerIcon />
            </ListItemIcon>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuOpenIcon onClick={toggleDrawer(anchor, true)} />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
