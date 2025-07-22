import * as React from "react";
import type { ToastActionElement, ToastProps } from "../components/ui/toast";

const NOTIFY_LIMIT = 1;
const NOTIFY_REMOVE_DELAY = 1000000;

type NotifyStackToast = ToastProps & {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
};

const actionTypes = {
    ADD_NOTIFY: "ADD_NOTIFY",
    UPDATE_NOTIFY: "UPDATE_NOTIFY",
    DISMISS_NOTIFY: "DISMISS_NOTIFY",
    REMOVE_NOTIFY: "REMOVE_NOTIFY",
} as const;

let count = 0;
function genNotifyId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}