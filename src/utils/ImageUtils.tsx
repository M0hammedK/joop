export const urlToBlob = async (url: string): Promise<Blob> => {
    const response = await fetch(url); 
    const blob = await response.blob();
    return blob;
  };

  export const blobToFile = async (blob: Blob, email: string) => {
    if(!blob) return null
    const data = new FormData()
    return data.set("file", blob, `${email}image.png`)
  }