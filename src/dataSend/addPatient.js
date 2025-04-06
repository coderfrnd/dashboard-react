export async function sendData(obj) {
  try {
    const response = await fetch(
      `https://dashboad-production.up.railway.app/patientDashboard`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending data:", error);
  }
}
