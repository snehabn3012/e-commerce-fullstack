
export const useUserData = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    const item = localStorage.getItem('jwt');
    if (item) {
        return JSON.parse(item)
    } else {
        return false;
    }
}
export const useIsAuthenticated = () => {
    const user = useUserData();
    if (user) {
        return true;
    }
    return false;
}

export const useIsAdmin = () => {
    const { user } = useUserData();
    return user.role === 1;
}

export const useIsRegisteredUser = () => {
    const { user } = useUserData();
    return user.role === 0;
}