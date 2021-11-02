import "@/App.less";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "@/components/views/Header/Header";
import Footer from "@/components/views/Footer/Footer";
import MainPage from "@/components/views/MainPage/MainPage";
import Monitoring from "@/components/views/Monitoring/Monitoring";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div
        style={{
          padding: "100px 50px 30px 50px",
          minHeight: "",
        }}
      >
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/monitoring" component={Monitoring} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
