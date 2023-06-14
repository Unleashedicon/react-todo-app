import Header from '../components/header';
import TodosLogic from '../components/TodosLogic';

const Home = () => (
  <div className="wrapper">
    <div className="todos">
      <Header />
      <TodosLogic />
    </div>
  </div>
);
export default Home;
