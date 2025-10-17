import { useState } from "react";
import Layout from "./Layout";
import { DashBoard } from "./pages/dashboard";

function App() {
  return (
    <>
      <Layout>
        <DashBoard />
      </Layout>
    </>
  );
}

export default App;
