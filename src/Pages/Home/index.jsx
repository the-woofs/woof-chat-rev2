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
  useParams,
  useNavigate,
} from "react-router-dom";
import { collection, doc, getFirestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Button } from "antd";

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
const db = getFirestore()

function Home() {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      {!user && !loading && <Auth />}
      {user && (
        <Router>
          <Routes>
            <Route exact path="/" element={<Redirect to="/WoofChatR2" />} />
            <Route path="/:chatRoom" element={<Conditional404 />} />
            <Route path="/t" element={<Test />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

function Conditional404() {
  const { chatRoom } = useParams();
  const docRef = doc(collection(db, "chat"), chatRoom);
  const [document, loading] = useDocumentData(docRef);

  const navigate = useNavigate();

  if (document) {
    return <Chat />;
  }

  else if (loading) {
    return <div>Loading...</div>;
  }

  else {
    return <><h1>404</h1>
    <Button type="primary" onClick={() => navigate("/WoofChatR2")}>Go To Home Chat Room</Button></>;
  }

}

export default Home;
