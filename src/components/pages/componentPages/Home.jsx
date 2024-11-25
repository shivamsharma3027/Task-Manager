import TaskList from "../TasksPages/TaskList.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

function Home() {
  return (
    <div className="flex flex-col  ">
      <Header />
      <TaskList />
      <Footer />
    </div>
  );
}

export default Home;
