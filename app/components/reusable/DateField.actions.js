export const DATE_FIELD_SET = 'DATE_FIELD_SET';
export const DATE_FIELD_CLEAR = 'DATE_FIELD_CLEAR';

export const setDate = date => ({
  type: DATE_FIELD_SET,
  date
});

export const clearDate = () => ({ type: DATE_FIELD_CLEAR });
