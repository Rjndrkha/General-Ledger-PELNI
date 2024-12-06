import React from "react";
import CardComponent from "../../component/card/card";

function Dashboard() {
  return (
    <>
      <div>
        <CardComponent
          href="/penarikan-general-ledger"
          imgAlt="test-img"
          imgSrc="https://portal.pelni.co.id/theme/dashboard/images/covid-icon.png"
          text="Penarikan General Ledger"
        />
      </div>
    </>
  );
}

export default Dashboard;
