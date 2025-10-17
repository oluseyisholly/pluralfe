import { useState } from "react";
import Button from "../../components/button";

export function DashBoard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <Button
        text={"Add New Patient"}
        onClick={() => {}}
        leftIcon={null}
        rightIcon={null}
      />
    </div>
  );
}
