import { Outlet, Navigate } from 'react-router-dom';
import { AccountContext } from '../Context/AccountContext';
import { useContext } from 'react';

const useAuth = () => {
	const {user} = useContext(AccountContext)
	console.log(user)
	return user && user.loggedIn;
};

const PrivateRoutes = () => {
	const isAuth = useAuth();
	return isAuth ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoutes;
