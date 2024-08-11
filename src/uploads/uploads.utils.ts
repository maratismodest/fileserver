import {
  FileTypeValidator,
  FileValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';

const mimeTypes = {
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

const MAX_SIZE = 1024 * 1024; // 1MB

export const validators: FileValidator<Record<string, any>>[] = [
  new MaxFileSizeValidator({ maxSize: MAX_SIZE }), //bytes
  new FileTypeValidator({
    fileType: new RegExp(`(${Object.keys(mimeTypes).join('|')})$`),
  }),
];
