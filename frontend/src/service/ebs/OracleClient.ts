import { Service } from "..";

export default class EbsClient {
  static async GetAllSPJ(body: {}) {
    const { response, error, errorMessage } = await Service.post(
      `${process.env.REACT_APP_PELNI_URL}${process.env.REACT_APP_BASE_DATA_SPJ_URL}`,
      body
    );

    return { response, error, errorMessage };
  }

  static async GetGeneralLedger(body: {}) {
    const { response, error, errorMessage } = await Service.post(
      `${process.env.REACT_APP_PELNI_URL}${process.env.REACT_APP_BASE_GENERAL_LEDGER_URL}`,
      body
    );

    return { response, error, errorMessage };
  }

  static async GetLogin(body: {}) {
    const { response, error, errorMessage } = await Service.post(
      `${process.env.REACT_APP_PELNI_URL}${process.env.REACT_APP_BASE_LOGIN_URL}`,
      body
    );

    return { response, error, errorMessage };
  }
}
