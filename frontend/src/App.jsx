import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImportListing from "./routes/ImportListing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

  <Route
    path="/property/:id"
    element={<PropertyDetails />}
  />

  <Route
    path="/admin/import"
    element={<ImportListing />}
  />
</Routes>
    </BrowserRouter>
  );
}

export default App;