import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import QiitaPage from "./pages/QiitaPage";
import RailsPage from "./pages/RailsPage";
import QiitapracticePage from "./pages/QiitapracticePage";
import EditTodo from "./pages/EditTodo";
import AddTodo from "./pages/AddTodo";
import Error from "./components/Error";
import Dark from "./components/Darkmode";
import Resas from "./pages/ResasPage";
import AddPost from "./pages/AddPost";
import AddMember from "./pages/AddMember";
import AboutPage from "./pages/AboutPage";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/qiita" element={<QiitaPage />} />
        <Route path="/todos" element={<RailsPage />} />
        <Route path="/todos/:id/edit" element={<EditTodo />} />
        <Route path="/member/new" element={<AddMember />} />
        <Route path="/todos/new" element={<AddTodo />} />
        <Route path="/qiitapractice" element={<QiitapracticePage />} />
        <Route path="*" element={<Error />} />
        <Route path="/dark" element={<Dark />} />
        <Route path="/resas" element={<Resas />} />
        <Route path="/posts/new" element={<AddPost />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routers;
