import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin,getUserInfo} from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      console.log('测试',payload);
      // return;
      const response = yield call(fakeAccountLogin, payload);
      localStorage.setItem('token',response.data.token);
      const res = yield call(getUserInfo,response.data.token);
      console.log(response);
      // console.log(res);
      if(response.code === 0) {
        response.status = 'ok';
        response.currentAuthority = res.data.roles
      }
      // console.log('结果',response);
      
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
      
      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        // console.log('params',params)
        
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      localStorage.removeItem('token');
      localStorage.removeItem('antd-pro-authority');
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status};
    },
  },
};
export default Model;
