export const randomName = (originalName: string): string => {
  const timestamp = Date.now();
  const uniqueSuffix = `${timestamp}-${Math.round(Math.random() * 1e9)}`;
  const extension = originalName.split(".").pop();
  return `${uniqueSuffix}.${extension}`;
};
