import { useNavigate } from 'react-router';
import { selectUserSession } from '../features/users/store/selectors/userSelectors';
import { useSelector } from 'react-redux';
import React from 'react';

const useGuard = () => {
    const navigate = useNavigate();
    const session = useSelector(selectUserSession);

    console.log("vuelve?")
    React.useEffect(() => {
        console.log(session)
        if (!session) {
            navigate("/");
        }
    }, [session, navigate]);
}

export default useGuard;