import { Auth } from "aws-amplify";
import { createContext, useState, useEffect, useContext } from "react";
const userContext = createContext(null);
export const useAuth = () => useContext(userContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function iscurrentSession() {
    try {
      await Auth.currentSession();
      const userdata = await Auth.currentUserInfo();
      setUser(userdata.attributes);
      console.log(userdata.atributes);
      setLoading(false);
      //checks there's a valid user logged and redirect to landing page in case we logout on this page.
    } catch (error) {
      setUser(null);
      setLoading(false);
    }
  }

  const signOut = async() =>{
    try {
        await Auth.signOut();
        setUser({});
               
         
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
const signIn = async(data)=> {//si la contraseña es erronea devuelve un 400
    try {
      await Auth.signIn(data.username, data.password);
      const userdata = await Auth.currentUserInfo();
      setUser(userdata.attributes);
    return true
    } catch (error) {
        console.log(error);
        return false
    }
  }
  useEffect(() => {
    iscurrentSession();
  }, []);

  return (
    <userContext.Provider value={{ user, loading,signOut,signIn }}>
      {children}
    </userContext.Provider>
  );
};
