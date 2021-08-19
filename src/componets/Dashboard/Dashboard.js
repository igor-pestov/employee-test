import moment from "moment";
import React, { useState } from "react";
import SwitchControl from "../../SwitcControl/SwitchControl";
import "./Dashboard.css";

const Dashboard = ({ data }) => {
  const [isActive, setIsActive] = useState(true);

  const arr = [];
  const arr1 = [];
  const unproductiveArray = [];
  const unproductiveArray2 = [];
  const startTime = [];
  const startTimeUnActive = [];

  data.map((item, i) => {
    if (item.active) {
      let time =
        new Date(moment(item.times.clockedOut).format()).getTime() -
        new Date(moment(item.times.clockedIn).format()).getTime();

      startTime.push(time);

      unproductiveArray.push(item.times.unproductiveTime);
      arr.push(i);
    } else {
      let time =
        new Date(moment(item.times.clockedOut).format()).getTime() -
        new Date(moment(item.times.clockedIn).format()).getTime();

      startTimeUnActive.push(time);

      unproductiveArray2.push(item.times.unproductiveTime);
      arr1.push(i);
    }
    return item;
  });

  const workTimeUnActive = () => {
    const fullTime = startTimeUnActive.reduce((prev, curr) => {
      return prev + curr;
    }, 0);
    let seconds = parseInt((fullTime / 1000) % 60),
      minutes = parseInt((fullTime / (1000 * 60)) % 60),
      hours = parseInt(fullTime / (1000 * 60 * 60));
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  const workTime = () => {
    const fullTime = startTime.reduce((prev, curr) => {
      return prev + curr;
    }, 0);
    let seconds = parseInt((fullTime / 1000) % 60),
      minutes = parseInt((fullTime / (1000 * 60)) % 60),
      hours = parseInt(fullTime / (1000 * 60 * 60));
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
  };

  const unproductiveTime = () => {
    const unTime = Math.round(
      unproductiveArray.reduce((prev, curr) => {
        return prev + curr;
      }, 0)
    );
    let hours = Math.trunc(unTime / 60);
    let minutes = unTime % 60;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let second = "00";
    return hours + ":" + minutes + ":" + second;
  };

  const unproductiveTimeUnActive = () => {
    const unTime = Math.round(
      unproductiveArray2.reduce((prev, curr) => {
        return prev + curr;
      }, 0)
    );
    let hours = Math.trunc(unTime / 60);
    let minutes = unTime % 60;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let second = "00";
    return hours + ":" + minutes + ":" + second;
  };

  const productionTime = () => {
    const fullTime = startTime.reduce((prev, curr) => {
      return prev + curr;
    }, 0);
    const unTime = Math.round(
      unproductiveArray.reduce((prev, curr) => {
        return prev + curr;
      }, 0) * 60000
    );
    const prodTime = fullTime - unTime;

    let seconds = parseInt((prodTime / 1000) % 60),
      minutes = parseInt((prodTime / (1000 * 60)) % 60),
      hours = parseInt(prodTime / (1000 * 60 * 60));
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
  };

  const productionTimeUnActive = () => {
    const fullTime = startTimeUnActive.reduce((prev, curr) => {
      return prev + curr;
    }, 0);
    const unTime = Math.round(
      unproductiveArray2.reduce((prev, curr) => {
        return prev + curr;
      }, 0) * 60000
    );
    const prodTime = fullTime - unTime;

    let seconds = parseInt((prodTime / 1000) % 60),
      minutes = parseInt((prodTime / (1000 * 60)) % 60),
      hours = parseInt(prodTime / (1000 * 60 * 60));
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
  };

  return (
    <div className="container">
      <div className="switch-box">
        <p>Show inactive employees</p>
        <SwitchControl
          data={data}
          setIsActive={setIsActive}
          isActive={isActive}
        />
        <p>Show active employees</p>
      </div>
      {isActive ? (
        <div className="main-board">
          <p>active employees - {arr.length}</p>
          <p>total running time - {workTime()} </p>
          <p>production time - {productionTime()} </p>
          <p>unproductive time - {unproductiveTime()} </p>
        </div>
      ) : (
        <div className="main-board">
          <p>inactive employees - {arr1.length}</p>
          <p>total running time - {workTimeUnActive()} </p>
          <p>production time - {productionTimeUnActive()} </p>
          <p>unproductive time - {unproductiveTimeUnActive()} </p>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
