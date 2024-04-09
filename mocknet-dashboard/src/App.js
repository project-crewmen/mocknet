import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Analytics from "./pages/analytics/Analytics";
import Cluster from "./pages/cluster/Cluster";
import NetworkCosts from "./pages/NetworkCosts/NetworkCosts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Analytics />} exact />
        <Route path="/cluster" element={<Cluster />} exact />
        <Route path="/networkCosts" element={<NetworkCosts />} exact />
        <Route path="*" element={<Analytics />} exact />
      </Routes>
    </Router>
  );
}

export default App;
