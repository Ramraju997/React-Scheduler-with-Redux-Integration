import React from "react";
import {
  ScheduleComponent,
  Month,
  Week,
  Resize,
  DragAndDrop,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import { useSelector, useDispatch } from "react-redux";
import { updateDataSource, fetchData } from "../Data/dataSlice";
import { useEffect } from "react";
const Scheduler = () => {
  const scheduleData = useSelector((state) => state.scheduleData.dataSource);
  const status = useSelector((state) => state.scheduleData.status);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  let data = [...scheduleData];
  const eventSettings = { dataSource: data };

  const onActionCompleted = (args) => {
    if (
      args.requestType === "eventCreated" ||
      args.requestType === "eventChanged" ||
      args.requestType === "eventRemoved"
    ) {
      dispatch(updateDataSource(args.addedRecords[0]));
    }
  };

  return (
    <ScheduleComponent
      eventSettings={eventSettings}
      height="750px"
      actionComplete={onActionCompleted}
    >
      <Inject services={[Month, Week, Resize, DragAndDrop]} />
    </ScheduleComponent>
  );
};

export default Scheduler;
