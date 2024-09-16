import { Header } from "../components/Header";
import { ToastContainer, toast } from "react-toastify";

function AboutPage(props: any) {
  return (
    <div className="flex">
      <Header />
      <ToastContainer />
      <div className="max-w-6xl m-auto mt-12">
        <p className="text-3xl font-bold">About</p>
        <p>このサイトはメンバー管理アプリです</p>
      </div>
    </div>
  );
}

export default AboutPage;
