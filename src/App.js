import React, { useState, useEffect } from "react";

const iconStyle = { marginRight: "8px", width: "24px", height: "24px" };

const DollarSign = () => (
  <svg
    style={iconStyle}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const Users = () => (
  <svg
    style={iconStyle}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const Utensils = () => (
  <svg
    style={iconStyle}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
    <path d="M7 2v20"></path>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
  </svg>
);

const CulinaryEmpire = () => {
  const [money, setMoney] = useState(100);
  const [customers, setCustomers] = useState(0);
  const [equipmentLevel, setEquipmentLevel] = useState(1);
  const [menuItems, setMenuItems] = useState([
    { name: "Burger", price: 5, productionTime: 5000 },
    { name: "Pizza", price: 8, productionTime: 8000 },
  ]);
  const [producing, setProducing] = useState(false);

  useEffect(() => {
    const customerInterval = setInterval(() => {
      if (customers < 5) {
        setCustomers((prev) => prev + 1);
      }
    }, 10000);

    return () => clearInterval(customerInterval);
  }, [customers]);

  const handleServeCustomer = (menuItem) => {
    if (customers > 0 && !producing) {
      setProducing(true);
      setTimeout(() => {
        setMoney((prev) => prev + menuItem.price);
        setCustomers((prev) => prev - 1);
        setProducing(false);
      }, menuItem.productionTime / equipmentLevel);
    }
  };

  const handleUpgradeEquipment = () => {
    const upgradeCost = equipmentLevel * 50;
    if (money >= upgradeCost) {
      setMoney((prev) => prev - upgradeCost);
      setEquipmentLevel((prev) => prev + 1);
    }
  };

  const containerStyle = {
    padding: "24px",
    maxWidth: "400px",
    margin: "20px auto",
    backgroundColor: "#FFF8E1",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#D84315",
    marginBottom: "20px",
  };

  const statsContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
  };

  const statStyle = {
    display: "flex",
    alignItems: "center",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#BDBDBD",
    cursor: "not-allowed",
  };

  const upgradeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4CAF50",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Culinary Empire</h1>

      <div style={statsContainerStyle}>
        <div style={statStyle}>
          <DollarSign />
          <span style={{ fontWeight: "bold" }}>{money}</span>
        </div>
        <div style={statStyle}>
          <Users />
          <span style={{ fontWeight: "bold" }}>{customers}</span>
        </div>
        <div style={statStyle}>
          <Utensils />
          <span style={{ fontWeight: "bold" }}>{equipmentLevel}</span>
        </div>
      </div>

      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => handleServeCustomer(item)}
          disabled={customers === 0 || producing}
          style={
            customers === 0 || producing ? disabledButtonStyle : buttonStyle
          }
        >
          Serve {item.name} (${item.price})
        </button>
      ))}

      <button
        onClick={handleUpgradeEquipment}
        disabled={money < equipmentLevel * 50}
        style={
          money < equipmentLevel * 50 ? disabledButtonStyle : upgradeButtonStyle
        }
      >
        Upgrade Equipment (${equipmentLevel * 50})
      </button>

      {producing && (
        <div
          style={{
            textAlign: "center",
            color: "#FF9800",
            fontWeight: "bold",
            marginTop: "12px",
          }}
        >
          Cooking in progress...
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div
      style={{
        backgroundColor: "#FFF3E0",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CulinaryEmpire />
    </div>
  );
}

export default App;
