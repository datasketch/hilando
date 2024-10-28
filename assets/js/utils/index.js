export const normalize = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export const getYouTubeVideoID = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};

export const getDriveVideoID = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=)([a-zA-Z0-9_-]{33})/;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};

export const getYouTubePreviewImage = (youtubeVideoID) => {
  return `https://img.youtube.com/vi/${youtubeVideoID}/hqdefault.jpg`;
};

export const getDrivePreviewImage = (driveVideoID) => {
  return `https://drive.google.com/thumbnail?id=${driveVideoID}`;
};

export const youtubeIframe = (url) => {
  const id = getYouTubeVideoID(url);
  return `https://www.youtube.com/embed/${id}`;
};

export const driveIframe = (url) => {
  const id = getDriveVideoID(url);
  return `https://drive.google.com/file/d/${id}/preview`;
};

export const getVideoPlatform = (url) => {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const driveRegex = /(?:https?:\/\/)?(?:www\.)?(?:drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=)([a-zA-Z0-9_-]{33})/;

  if (youtubeRegex.test(url)) {
    return 'YouTube';
  } else if (driveRegex.test(url)) {
    return 'Google Drive';
  } else {
    return 'Unknown';
  }
};

export const getIframe = (url) => {
  const videoPlatform = getVideoPlatform(url);

  if (videoPlatform === 'YouTube') {
    return youtubeIframe(url);
  }

  if (videoPlatform === 'Google Drive') {
    return driveIframe(url);
  }

  return null;
};
