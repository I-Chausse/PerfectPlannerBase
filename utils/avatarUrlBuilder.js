import { apiHost, apiPort } from './hosts';

const buildAvatarUrl = (user) => {
    if (user?.avatar?.link!= null) {
        return `https://${apiHost}${user.avatar.link}`;
    } else {
        return `https://${apiHost}/avatars/avatarUndefined.png`; // Fallback URL
    }
}

export default buildAvatarUrl;