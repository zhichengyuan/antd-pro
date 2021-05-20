/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable import/no-mutable-exports */
let CURRENT = 'NULL';

/**
 * Use authority or getAuthority
 *
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = (Authorized) => (currentAuthority) => {
  // console.log(Authorized)
  if (currentAuthority) {
    if (typeof currentAuthority === 'function') {
      CURRENT = currentAuthority();
    }

    if (
      Object.prototype.toString.call(currentAuthority) === '[object String]' ||
      Array.isArray(currentAuthority)
    ) {
      CURRENT = currentAuthority;
    }
  } else {
    CURRENT = 'NULL';
  }
  // console.log(CURRENT)
  return Authorized;
};

export { CURRENT };
export default (Authorized) => renderAuthorize(Authorized);
