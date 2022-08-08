import { BrowserRouter, Route, Routes} from "react-router-dom";
import AddCard from "./components/AddCard";
import CardList from "./components/CardList";
import EditCard from "./components/EditCard";
import ViewCard from "./components/ViewCard";
import "./styles/main.css";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="add" element={<AddCard />} />
        <Route path="edit/:id" element={<EditCard />} />
        <Route path="view/:id" element={<ViewCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
