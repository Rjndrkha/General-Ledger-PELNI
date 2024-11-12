import { Service } from "..";

export default class PortalClient {
  static async GetLogin(body: {}) {
    const { response, error, errorMessage } = await Service.post(
      `${process.env.REACT_APP_PELNI_URL}${process.env.REACT_APP_BASE_LOGIN_URL}`,
      body
    );

    return { response, error, errorMessage };
  }
}
