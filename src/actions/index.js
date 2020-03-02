import * as types from './types';

export const submitAuthData = (values) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_USER_DATA, payload: { email: values.email } });
  } catch (err) {}
};
