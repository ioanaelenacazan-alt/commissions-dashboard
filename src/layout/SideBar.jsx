function SideBar({
  showConsultants,
  setShowConsultants,
  showTeamLeaders,
  setShowTeamLeaders,
  showTM6,
  setShowTM6,
  showAccessories,
  setShowAccessories,
  includeDemoDelivery,
  setIncludeDemoDelivery,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-semibold mb-3 text-gray-500">FILTRE</h3>

        <label className="block mb-2">
          <input
            type="checkbox"
            checked={showConsultants}
            onChange={(e) => setShowConsultants(e.target.checked)}
            className="mr-2"
          />
          Consultanți
        </label>

        <label className="block">
          <input
            type="checkbox"
            checked={showTeamLeaders}
            onChange={(e) => setShowTeamLeaders(e.target.checked)}
            className="mr-2"
          />
          Team Leaders
        </label>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-gray-500">CATEGORII COMISION</h3>

        <label className="block mb-2">
          <input
            type="checkbox"
            checked={showTM6}
            onChange={(e) => setShowTM6(e.target.checked)}
            className="mr-2"
          />
          TM6
        </label>

        <label className="block">
          <input
            type="checkbox"
            checked={showAccessories}
            onChange={(e) => setShowAccessories(e.target.checked)}
            className="mr-2"
          />
          Accesorii
        </label>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-gray-500">EXTRA</h3>

        <label className="block">
          <input
            type="checkbox"
            checked={includeDemoDelivery}
            onChange={(e) => setIncludeDemoDelivery(e.target.checked)}
            className="mr-2"
          />
          Include +30€ Demo Delivery
        </label>
      </div>
    </div>
  );
}

export default SideBar;