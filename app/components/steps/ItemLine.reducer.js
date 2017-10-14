import { ITEM_LINE_NEXT, ITEM_LINE_CLEAR,
  ITEM_LINE_ADD } from './ItemLine.actions';

const initialState = {
  itemLines: []
};

export default function itemLine(state = initialState, action) {
  switch (action.type) {
    case ITEM_LINE_ADD:
      return { ...state, itemLines: [...state.itemLines, { ...action.itemLine }] };
    case ITEM_LINE_NEXT:
      return { ...state, ...action.data };
    case ITEM_LINE_CLEAR:
      return initialState;
    default:
      return state;
  }
}
