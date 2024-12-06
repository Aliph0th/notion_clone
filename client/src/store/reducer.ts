import { ACTIONS, DEFAULT_STATE } from '../constants';
import { ErrorToast } from '../types';

export const reducer = (
   state = DEFAULT_STATE,
   action: { type: (typeof ACTIONS)[keyof typeof ACTIONS]; payload: number | string }
): { errorToasts: ErrorToast[] } => {
   switch (action.type) {
      case ACTIONS.PUSH_TOAST:
         return {
            ...state,
            errorToasts: [...state.errorToasts, { id: Date.now(), message: action.payload as string }]
         };
      case ACTIONS.CLOSE_TOAST:
         return { ...state, errorToasts: state.errorToasts.filter(toast => toast.id !== (action.payload as number)) };
      default:
         return state;
   }
};
