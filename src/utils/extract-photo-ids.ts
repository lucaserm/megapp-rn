export const extractPhotoIds = (html: string): string[] => {
  const regex = /<div class="row view-(\d+)">/g;
  const ids: string[] = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    ids.push(match[1]);
  }

  return ids;
};
