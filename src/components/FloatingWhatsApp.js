import React from "react";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

/**
 * Repo: https://github.com/awran5/react-floating-whatsapp
 */

export default function App() {
  return (
    <div className="App">
      <FloatingWhatsApp
        phoneNumber="917275591984"
        accountName="Monika"
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
    </div>
  );
}
