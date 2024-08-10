export const convertLinksToMedia = (images: string[], caption: string) =>
  images.map((image: string, index: number) =>
    index === 0
      ? {
          type: 'photo',
          media: image,
          caption: caption,
        }
      : {
          type: 'photo',
          media: image,
        },
  );
