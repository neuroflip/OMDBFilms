import useGuard from "../useGuard";
import { setSession } from "../../features/users/store/slice/userSlice";
import { useDispatch } from "react-redux";

const TestComponent = ({setsSession} : { setsSession: boolean }) => {
    const dispatch = useDispatch();
    if(setsSession) {
        console.log("enmtra?");
        dispatch(setSession({
            provider_token: "providerToken",
            provider_refresh_token: "providerRefreshToken",
            access_token: "accessToken",
            refresh_token: "refreshToken",
            expires_in: 121212,
            expires_at: 12121213123,
            token_type: 'bearer',
            user: {
            id: "userId",
            app_metadata: {},
            user_metadata: {},
            aud: "",
            created_at: "213123123"
            }
        }));
    }

    useGuard();

    return <div data-testid="guard"></div>;
}

export default TestComponent;