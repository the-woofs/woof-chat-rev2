import "./index.css";

import Auth from "../Auth";
import Chat from "../Chat";
import Test from "../Test";

import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate as Redirect,
} from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBGRAK-EfOOggku6WKGxcddXrezCx4qO_0",
  authDomain: "woof-chat-r2.firebaseapp.com",
  projectId: "woof-chat-r2",
  storageBucket: "woof-chat-r2.appspot.com",
  messagingSenderId: "416651921911",
  appId: "1:416651921911:web:5f272c3687a4ae03adc6f2",
};

initializeApp(firebaseConfig);
const auth = getAuth();

function Home() {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      {!user && !loading && <Auth />}
      {user && (
        <Router>
          <Routes>
            <Route exact path="/" element={<Redirect to="/WoofChatR2" />} />
            <Route path="/:chatRoom" element={<Chat />} />
            <Route path="/t" element={ <Test />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default Home;
