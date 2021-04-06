import { getUserInfo} from '@/services/login';
const UserModel = {
  namespace: 'userInfo',
  state: {
    user: {},
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      let token = localStorage.getItem('token')
      const response = yield call(getUserInfo,token);
      console.log('的呃呃',response);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      console.log('action',action)
      return { ...state, user: action.payload || {} };
    },
  },
};
export default UserModel;
