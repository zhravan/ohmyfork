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
const notifyActionTypes = {
  ADD: "ADD_NOTIFY",
  UPDATE: "UPDATE_NOTIFY",
  DISMISS: "DISMISS_NOTIFY",
  REMOVE: "REMOVE_NOTIFY"
} as const;

// Unique ID generator for notifications
let notifyCount = 0;
function genNotifyId() {
  notifyCount = (notifyCount + 1) % Number.MAX_SAFE_INTEGER;
  return notifyCount.toString();
}

// Notification reducer actions
type NotifyAction =
  | { type: typeof notifyActionTypes.ADD; toast: NotifyToast }
  | { type: typeof notifyActionTypes.UPDATE; toast: Partial<NotifyToast> & { id: string } }
  | { type: typeof notifyActionTypes.DISMISS; id: string }
  | { type: typeof notifyActionTypes.REMOVE; id: string };

// Notification reducer
function notifyReducer(state: NotifyToast[], action: NotifyAction): NotifyToast[] {
  switch (action.type) {
    case notifyActionTypes.ADD:
      return [action.toast, ...state].slice(0, NOTIFY_LIMIT);
    case notifyActionTypes.UPDATE:
      return state.map(t => t.id === action.toast.id ? { ...t, ...action.toast } : t);
    case notifyActionTypes.DISMISS:
      return state.map(t => t.id === action.id ? { ...t, open: false } : t);
    case notifyActionTypes.REMOVE:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
}

// Main notification stack hook
export function useNotifyStack() {
  const [toasts, dispatch] = React.useReducer(notifyReducer, []);

  // Add a new notification
  const notify = React.useCallback((toast: Omit<NotifyToast, "id">) => {
    const id = genNotifyId();
    dispatch({ type: notifyActionTypes.ADD, toast: { ...toast, id, open: true } });
    setTimeout(() => dispatch({ type: notifyActionTypes.REMOVE, id }), NOTIFY_REMOVE_DELAY);
    return id;
  }, []);

  // Update a notification
  const update = React.useCallback((id: string, update: Partial<NotifyToast>) => {
    dispatch({ type: notifyActionTypes.UPDATE, toast: { ...update, id } });
  }, []);

  // Dismiss a notification
  const dismiss = React.useCallback((id: string) => {
    dispatch({ type: notifyActionTypes.DISMISS, id });
  }, []);

  return { toasts, notify, update, dismiss };
}
