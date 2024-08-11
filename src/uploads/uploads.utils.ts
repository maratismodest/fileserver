export const mimeTypes = {
  jpeg: 'image/jpeg',
  jpg: 'image/jpg',
  png: 'image/png',
} as const;

export const getExtension = (mimeType: string) => {
  switch (mimeType) {
    case mimeTypes.jpeg:
      return 'jpeg';
    case mimeTypes.jpg:
      return 'jpg';
    case mimeTypes.png:
      return 'png';
    default:
      return 'unknown';
  }
};
