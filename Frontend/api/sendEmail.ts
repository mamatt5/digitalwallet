import { Linking } from 'react-native';
import qs from 'qs';

// opens external handler at the moment
// mabye look into use emailjs
export async function sendEmail(to: string, subject: string, body: string, options = {}) {
   

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body,
    });

    if (query.length) {
        url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
}