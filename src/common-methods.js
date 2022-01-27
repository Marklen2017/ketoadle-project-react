export const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
};

export const getUserType = () => {
    return JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')).userType : null;
};

export const getUserName = () => {
    return JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')).name : null;
}

export const getUserData = () => {
    return JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')) : null;
}

export const getAccessToken = () => {
    return JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')).token : null;
}

export const getUrlTextLink = (inputText) => {
    var replacedText, replacePattern1;
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText ? inputText.replace(replacePattern1, '<a style="color:#4267b2;text-decoration:none;" href="$1" target="_blank">$1</a>') : inputText;
    return replacedText;
}

export const parseToekJwt = () => {
    var base64Url = getAccessToken().split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const isAuth = () => {
    if (getAccessToken()) {
        return true;
    }
    return false;
}