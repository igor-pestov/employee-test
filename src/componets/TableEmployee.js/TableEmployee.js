import React, { useState } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import SwitchControl from "../../SwitcControl/SwitchControl";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    width: "70%",
    border: "1px gray solid",
    marginBottom: '50px'
  },
  root: {
    marginTop: '50px',
    paddingTop: "5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e7d4",
  },
  align: {},
});

const TableEmployee = ({ data }) => {
  const [active, setActive] = useState(data);
  const [isItem, setIsItem] = useState(true);

  const changeStatus = (item) => {
    setActive((prev) =>
      prev.map((elem) => {
        if (elem._id === item._id) return { ...elem, active: !elem.active };
        return elem;
      })
    );
    localStorage.setItem("employee", JSON.stringify(active));
  };

  const workTime = (item) => {
    let TotalTime =
      new Date(moment(item.times.clockedOut).format()).getTime() -
      new Date(moment(item.times.clockedIn).format()).getTime();
    let seconds = parseInt((TotalTime / 1000) % 60),
      minutes = parseInt((TotalTime / (1000 * 60)) % 60),
      hours = parseInt((TotalTime / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  const productionTime = (item) => {
    let productTime =
      new Date(moment(item.times.clockedOut).format()).getTime() -
      new Date(moment(item.times.clockedIn).format()).getTime() -
      item.times.unproductiveTime * 60000;

    let seconds = parseInt((productTime / 1000) % 60),
      minutes = parseInt((productTime / (1000 * 60)) % 60),
      hours = parseInt((productTime / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  const unproductiveTime = (item) => {
    let hours = Math.trunc(item.times.unproductiveTime / 60);
    let minutes = item.times.unproductiveTime % 60;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let second = "00";
    return hours + ":" + minutes + ":" + second;
  };

  const ratio = (item) => {
    let productionTime =
      new Date(moment(item.times.clockedOut).format()).getTime() -
      new Date(moment(item.times.clockedIn).format()).getTime();

    let unproductiveTime = item.times.unproductiveTime * 60000;

    let ratioProductive =
      ((productionTime - unproductiveTime) / productionTime) * 100;
    return ratioProductive.toFixed(1) + "%";
  };

  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <p>Show inactive employees</p>
        <SwitchControl isActive={isItem} setIsActive={setIsItem} />
        <p>Show active employees</p>
      </div>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell>total running time</TableCell>
            <TableCell>production time</TableCell>
            <TableCell>unproductive time</TableCell>
            <TableCell>productivity ratio</TableCell>
            <TableCell>status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {active.map((item, i) => {
            return (
              item.active === isItem && (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell>{workTime(item)}</TableCell>
                  <TableCell>{productionTime(item)}</TableCell>
                  <TableCell>{unproductiveTime(item)}</TableCell>
                  <TableCell>{ratio(item)}</TableCell>
                  {item.active ? (
                    <TableCell>
                      <img
                        style={{cursor:"pointer"}}
                        src="https://img.icons8.com/material-outlined/24/26e07f/filled-circle--v1.png"
                        alt="online"
                        onClick={() => changeStatus(item)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell>
                      <img    
                        style={{cursor:"pointer"}}
                        src="https://img.icons8.com/material-outlined/24/fa314a/filled-circle--v1.png"
                        alt="offline"
                        onClick={() => changeStatus(item)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              )
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableEmployee;
