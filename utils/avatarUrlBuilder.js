import { apiHost, apiPort } from './hosts';

export const buildAvatarUrl = (user) => {
    if (user?.avatar?.link!= null) {
        return `https://${apiHost}${user.avatar.link}`;
    } else {
        return `https://${apiHost}/avatars/avatarUndefined.png`; // Fallback URL
    }
}

export const buildAvatarUrlFromList = (avatar) => {
    if (avatar?.link!= null) {
        return `https://${apiHost}${avatar.link}`;
    } else {
        return `https://${apiHost}/avatars/avatarUndefined.png`; // Fallback URL
    }
}