import "@/App.less";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "@/components/views/Header/Header";
import Footer from "@/components/views/Footer/Footer";
import AccessControl from "@accessControl/AccessControl";
import CheckReservation from "@checkReservation/CheckReservation";
import CustomerResv from "@customerResv/CustomerResv";
import MainPage from "@/components/views/MainPage/MainPage";
import Monitoring from "@/components/views/Monitoring/Monitoring";
import ReservationPage from "@/components/views/ReservationPage/ReservationPage";
import Statistics from "@statistics/Statistics";

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
          <Route exact path="/accessControl" component={AccessControl} />
          <Route exact path="/customerResv" component={CustomerResv} />
          <Route exact path="/checkReservation" component={CheckReservation} />
          <Route exact path="/monitoring" component={Monitoring} />
          <Route exact path="/reservationPage" component={ReservationPage} />
          <Route exact path="/statistics" component={Statistics} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
