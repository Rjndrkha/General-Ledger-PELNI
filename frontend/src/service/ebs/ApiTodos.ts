import { Service } from "..";

export default class EbsClient {
  static async GetAllSPJ() {
    const { response, error, errorMessage } = await Service.get(
      `${process.env.REACT_APP_PELNI_URL}${process.env.REACT_APP_BASE_DATA_SPJ_URL}`
    );

    return { response, error, errorMessage };
  }
}
