import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Data/dataSlice";
import { createLogger } from "redux-logger";


const logger = createLogger({})

export const store = configureStore({
    reducer: {
        scheduleData: dataReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: ['data/updatedDataSource'],
            ignoredPaths: ['scheduleData.dataSource'],
        }
    }).concat(logger)
})