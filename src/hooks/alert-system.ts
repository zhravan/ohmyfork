import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

// Notification system constants
const NOTIFY_LIMIT = 2;
const NOTIFY_REMOVE_DELAY = 5000;

// Notification toast type
type NotifyToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Action types for notification reducer
const alertActionTypes = {
  ADD: "ADD_NOTIFY",
  UPDATE: "UPDATE_NOTIFY",
  DISMISS: "DISMISS_NOTIFY",
  REMOVE: "REMOVE_NOTIFY"
} as const;

// Unique ID generator for notifications
let notifyCount = 0;
function generateAlertId() {
  notifyCount = (notifyCount + 1) % Number.MAX_SAFE_INTEGER;
  return notifyCount.toString();
}

// Notification reducer actions
type NotifyAction =
  | { type: typeof alertActionTypes.ADD; toast: NotifyToast }
  | { type: typeof alertActionTypes.UPDATE; toast: Partial<NotifyToast> & { id: string } }
  | { type: typeof alertActionTypes.DISMISS; id: string }
  | { type: typeof alertActionTypes.REMOVE; id: string };

// Notification reducer
function alertReducer(state: NotifyToast[], action: NotifyAction): NotifyToast[] {
  switch (action.type) {
    case alertActionTypes.ADD:
      return [action.toast, ...state].slice(0, NOTIFY_LIMIT);
    case alertActionTypes.UPDATE:
      return state.map(t => t.id === action.toast.id ? { ...t, ...action.toast } : t);
    case alertActionTypes.DISMISS:
      return state.map(t => t.id === action.id ? { ...t, open: false } : t);
    case alertActionTypes.REMOVE:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
}

// Main notification stack hook
export function useAlertSystem() {
  const [toasts, dispatch] = React.useReducer(alertReducer, []);

  // Add a new notification
  const notify = React.useCallback((toast: Omit<NotifyToast, "id">) => {
    const id = generateAlertId();
    dispatch({ type: alertActionTypes.ADD, toast: { ...toast, id, open: true } });
    setTimeout(() => dispatch({ type: alertActionTypes.REMOVE, id }), NOTIFY_REMOVE_DELAY);
    return id;
  }, []);

  // Update a notification
  const update = React.useCallback((id: string, update: Partial<NotifyToast>) => {
    dispatch({ type: alertActionTypes.UPDATE, toast: { ...update, id } });
  }, []);

  // Dismiss a notification
  const dismiss = React.useCallback((id: string) => {
    dispatch({ type: alertActionTypes.DISMISS, id });
  }, []);

  return { toasts, notify, update, dismiss };
}