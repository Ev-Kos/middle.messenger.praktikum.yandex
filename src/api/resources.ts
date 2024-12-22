import HTTPTransport from "../core/HTTPTransport";
import { TFile, TErrorApi } from "../utils/types";

const resourcesApi = new HTTPTransport("/resources");

export default class ResourcesApi {

  async uploadResource(file: File): Promise<TFile | TErrorApi> {
    const formData = new FormData();
    formData.append("resource", file, file.name);
    const data = formData
    return resourcesApi.post("", { data });
  }
}
