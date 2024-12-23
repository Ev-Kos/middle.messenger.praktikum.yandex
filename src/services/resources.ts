import ResourcesApi from "../api/resources";

export const resourcesApi = new ResourcesApi();

export const uploadResource = async (file: File) => {
  window.store.set({ isLoadingUploadResouse: true });
  try {
    const uploadPhoto = await resourcesApi.uploadResource(file);
    //@ts-ignore
    window.store.set({ isMessagePhoto: false, isClickFileLoad: false, uploadedMessagePhoto: {path: uploadPhoto.path, id: uploadPhoto.id} });
  } catch (error: any) {
    window.store.set({ uploadResourceError: error.reason });
  } finally {
    window.store.set({ isLoadingUploadResouse: false });
  }
}
