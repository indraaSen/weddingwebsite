import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpinnerComponent from "../Module/SpinnerComponent/SpinnerComponent";
import { Suspense, lazy } from "react";

const HomeComponent = lazy(() =>
  import("../Features/HomeComponent/HomeComponent")
);
const AuthComponent = lazy(() => import("../AuthComponent/AuthComponent"));
const SignUpComponent = lazy(() =>
  import("../AuthComponent/SignUpComponent/SignUpComponent")
);
const EventComponent = lazy(() =>
  import("../Features/EventComponent/EventComponent")
);
const ContactComponent = lazy(() =>
  import("../Features/ContactComponent/ContactComponent")
);
const SuccessComponent = lazy(() =>
  import("../Payment/SuccessComponent/SuccessComponent")
);
const CancelComponent = lazy(() =>
  import("../Payment/CancelComponent/CancelComponent")
);
const PaymentHistoryComponent = lazy(() =>
  import("../Features/PaymentHistoryComponent/PaymentHistoryComponent")
);
const ErrorPage = lazy(() => import("../Features/ErrorPage/ErrorPage"));

const MainComponent = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<SpinnerComponent />}>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/signin" element={<AuthComponent />} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/event" element={<EventComponent />} />
          <Route path="/contactus" element={<ContactComponent />} />
          <Route path="/paymenthistory" element={<PaymentHistoryComponent />} />
          <Route path="/success" element={<SuccessComponent />} />
          <Route path="/cancel" element={<CancelComponent />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default MainComponent;
