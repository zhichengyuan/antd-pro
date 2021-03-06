import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.

export function getAuthority(str) {
  // console.log(str);
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str; // authorityString could be admin, "admin", ["admin"]

  let authority;
  // console.log(authorityString);
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  
  if (typeof authority === 'string') {
    return [authority];
  } // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  // console.log("authority",authority)
  // console.log(ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION)
  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    // console.log('1212')
    return ['admin'];
  }
  // console.log(authority);
  return authority;
}
export function setAuthority(authority) {
  console.log('我来的',authority)
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority)); // auto reload
  reloadAuthorized();
}
