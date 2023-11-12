import { getUrl } from "../../mock/data";

class APIBase {
  static callApi = async (method, enpoint, params, signal) => {
    const response = await fetch(getUrl(enpoint, params), {
      method,
      signal,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();

    //mock delay 300ms for loader to simulate real behaviour
    return await new Promise((resolve) =>
      setTimeout(() => {
        resolve(jsonResponse);
      }, 300)
    );
  };
}

export class API extends APIBase {
  static call = (method, endpoint, params, signal) =>
    this.callApi(method, endpoint, params, signal);
}
