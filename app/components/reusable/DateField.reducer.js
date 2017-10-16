import { formatDate } from '../../utils';
import { DATE_FIELD_SET } from './DateField.actions';

const initialState = {
  selectedDate: formatDate(new Date()),
};

export default function purchaseHeader(state = initialState, action) {
  switch (action.type) {
    case DATE_FIELD_SET:
      return { ...state, selectedDate: action.date };
    default:
      return state;
  }
}
