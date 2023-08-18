import { useEffect, useState } from "react";
import { AuthContext } from "common/context";
import firebase from "firebase/app";
import { auth } from "firebaseSetup";
import { PageLoader } from "common/components";

export const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<firebase.User | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
			setUser(firebaseUser);
			setIsLoaded(true);
		});

		return unsubscribe;
	}, []);

	if (!isLoaded) {
		return <PageLoader />;
	}

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
