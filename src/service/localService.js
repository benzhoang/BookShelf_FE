export const localUserServ = {
    get: () => {
        let dataJson = localStorage.getItem("USER_INFO");
        return dataJson ? JSON.parse(dataJson) : null;
    },
    
    set: (userInfo) => {
        if (userInfo) {
            const { accessToken, refreshToken, metadata } = userInfo;

            if (accessToken && refreshToken) {
                localStorage.setItem("ACCESS_TOKEN", accessToken);
                localStorage.setItem("REFRESH_TOKEN", refreshToken);
            }

            if (metadata) {
                localStorage.setItem("USER_INFO", JSON.stringify(metadata));
            }
        } else {
            console.error("Dữ liệu đăng nhập không hợp lệ:", userInfo);
        }
    },

    getAccessToken: () => localStorage.getItem("ACCESS_TOKEN") || null,

    getRefreshToken: () => localStorage.getItem("REFRESH_TOKEN") || null,

    remove: () => {
        localStorage.removeItem("USER_INFO");
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
    }
};
