import InfoAccount from "./InfoAccount";
import InfoTransactions from "./InfoTransactions";
import InfoTravels from "./InfoTravels";
import { useState } from "react";

const tabs = [
  { label: "Account", component: <InfoAccount /> },
  { label: "Transactions", component: <InfoTransactions /> },
  { label: "Travels", component: <InfoTravels /> },
];

const Profile = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64 w-full bg-white rounded-lg shadow p-4 flex md:flex-col flex-row gap-2 md:gap-0 mb-4 md:mb-0">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              className={`text-right px-4 py-2 rounded transition font-medium text-base md:text-lg w-full ${
                selected === idx
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSelected(idx)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </aside>
        <main className="flex-1 min-w-0">{tabs[selected].component}</main>
      </div>
    </div>
  );
};

export default Profile;
