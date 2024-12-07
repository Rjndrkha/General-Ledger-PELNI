import { Service } from "..";

export default class DashboardClient {
  static async GetMenuAccess(body: {}, token: {}) {
    const { response, error, errorMessage } = await Service.get(
      `${process.env.REACT_APP_PELNI_URL}${process.env.REACT_APP_DASHBOARD_MENU_ACCESS}`,
      body,
      token
    );

    return { response, error, errorMessage };
  }
}
