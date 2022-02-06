import logo from "./logo.svg";
import "./App.css";

// npm start 보다는 yarn start 가 더 빠르고 안정적으로 시작할 수 있다
// 본인이 디자인 하기 힘들때는, BootStrap 이라는 외부 source library를 이용해서 사이트를
// 만들 수도 있다
// 사용하기 위해서는 react bootstrap을 검색해 따라하면 된다

function App() {
  return (
    <div className="App">
      <button type="button" class="btn btn-secondary">
        Secondary
      </button>
    </div>
  );
}

export default App;
