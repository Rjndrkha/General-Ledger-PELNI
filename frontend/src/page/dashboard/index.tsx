import React from "react";
import CardComponent from "../../component/card/card";

function Dashboard() {
  return (
    <>
      <section className="flex flex-col gap-3">
        <div>
          <h1 className="text-base font-bold text-blue-950">List Of</h1>
          <h1 className="font-extrabold text-blue-950">
            Enterprise Application
          </h1>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <CardComponent
            href="/penarikan-general-ledger"
            imgAlt="test-img"
            imgSrc="https://portal.pelni.co.id/theme/dashboard/images/covid-icon.png"
            text="Penarikan General Ledger"
          />
          <CardComponent
            href="/penarikan-general-ledger"
            imgAlt="test-img"
            imgSrc="https://portal.pelni.co.id/theme/dashboard/images/covid-icon.png"
            text="Penarikan General Ledger"
          />
          <CardComponent
            href="/penarikan-general-ledger"
            imgAlt="test-img"
            imgSrc="https://portal.pelni.co.id/theme/dashboard/images/covid-icon.png"
            text="Penarikan General Ledger"
          />
          <CardComponent
            href="/penarikan-general-ledger"
            imgAlt="test-img"
            imgSrc="https://portal.pelni.co.id/theme/dashboard/images/covid-icon.png"
            text="Penarikan General Ledger"
          />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
