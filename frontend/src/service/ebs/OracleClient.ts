import { Service } from "..";

export default class EbsClient {
  static async PostAllSPJ(body: {}, token: {}) {
    const { response, error, errorMessage } = await Service.post(
      `${process.env.REACT_APP_PELNI_URL}${process.env.REACT_APP_BASE_DATA_SPJ_URL}`,
      body,
      token
    );

    return { response, error, errorMessage };
  }

  static async PostGeneralLedger(body: {}, token: {}) {
    const { response, error, errorMessage } = await Service.post(
      `${process.env.REACT_APP_PELNI_URL}${process.env.REACT_APP_BASE_GENERAL_LEDGER_URL}`,
      body,
      token
    );

    return { response, error, errorMessage };
  }

  static async GetGeneralLedgerStatus(body: {}, token: {}) {
    const { response, error, errorMessage } = await Service.get(
      `${process.env.REACT_APP_PELNI_URL}${process.env.REACT_APP_BASE_GENERAL_LEDGER_STATUS_URL}`,
      body,
      token
    );

    return { response, error, errorMessage };
  }

  static async GetGeneralLedgerDownload(body: {}, token: {}) {
    const { response, error, errorMessage } = await Service.get(
      `${process.env.REACT_APP_PELNI_URL}${process.env.REACT_APP_BASE_GENERAL_LEDGER_DOWNLOAD_URL}/${body}`,
      {},
      token
    );

    return { response, error, errorMessage };
  }
}