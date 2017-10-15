import { FOOTER_INVOICE_IMAGE, FOOTER_NAME,
  FOOTER_SIGNATURE_IMAGE, FOOTER_CLEAR } from './Footer.actions';

const initialState = {
  invoiceReferenceImagePath: '',
  name: '',
  signatureImagePath: ''
};

export default function footer(state = initialState, action) {
  switch (action.type) {
    case FOOTER_INVOICE_IMAGE:
      return { ...state, invoiceReferenceImagePath: action.imageLocation };
    case FOOTER_NAME:
      return { ...state, name: action.name };
    case FOOTER_SIGNATURE_IMAGE:
      return { ...state, signatureImagePath: action.imageLocation };
    case FOOTER_CLEAR:
      return initialState;
    default:
      return state;
  }
}
