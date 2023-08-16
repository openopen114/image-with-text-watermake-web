import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";

import * as _ from "lodash";

/**
 *
 * 加密site id
 *
 *
 */
const encodeSiteId = (_siteId) => {
  let encodeSiteId = _siteId;
  for (let i = 0; i < 8; i++) {
    Utf8.parse(encodeSiteId);
    encodeSiteId = Base64.stringify(Utf8.parse(encodeSiteId));
  }

  return encodeSiteId;
};

export { encodeSiteId };
