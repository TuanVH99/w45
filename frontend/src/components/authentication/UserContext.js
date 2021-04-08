import {
    createContext,
} from 'react';
const UserContext = createContext({
    authUser: null,
    setAuthUser: () => {}
})
export default UserContext;