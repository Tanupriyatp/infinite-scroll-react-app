import "./App.css";
import PostFeed from "./pages/PostFeed";
import { Provider } from 'react-redux';
import store from "./redux/store";


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PostFeed />
      </div>
    </Provider>
  );
}

export default App;
