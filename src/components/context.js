<Context.Provider value={{
      firebaseApp,
      auth,
      firestore,
    }}>   
</Context.Provider>

export const Context = createContext(null);

const {auth} = useContext(Context);

const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const {user} = await auth.signInWithPopup(provider);    
    console.log(user);
}