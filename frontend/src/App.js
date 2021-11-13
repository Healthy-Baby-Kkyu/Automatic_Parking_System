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
import Login from "@/components/views/Login/Login";
import SignUp from "@/components/views/SignUp/SignUp";
import ChargePoint from "@/components/views/ChargePoint/ChargePoint";
import EditPersonalInfo from "@/components/views/EditPersonalInfo/EditPersonalInfo"
import PersonalInfo from "@/components/views/PersonalInfo/PersonalInfo"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div
        style={{
          padding: "0px 50px 30px 50px",
          minHeight: "800px",
        }}
      >
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/accessControl" component={AccessControl} />
          <Route exact path="/customerResv" component={CustomerResv} />
          <Route exact path="/checkReservation" component={CheckReservation} />
          <Route exact path="/monitoring" component={Monitoring} />
          <Route exact path="/reservationPage" component={ReservationPage} />
          <Route exact path="/statistics" component={Statistics} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/chargePoint" component={ChargePoint} />
          <Route exact path="/editPersonalInfo" component={EditPersonalInfo} />
          <Route exact path="/personalInfo" component={PersonalInfo} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
