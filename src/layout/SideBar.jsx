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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
            Filtre
          </h3>

          <label className="flex items-center gap-3 mb-3 text-gray-800">
            <input
              type="checkbox"
              checked={showConsultants}
              onChange={() => setShowConsultants(!showConsultants)}
              className="w-4 h-4"
            />
            <span>Consultanți</span>
          </label>

          <label className="flex items-center gap-3 text-gray-800">
            <input
              type="checkbox"
              checked={showTeamLeaders}
              onChange={() => setShowTeamLeaders(!showTeamLeaders)}
              className="w-4 h-4"
            />
            <span>Team Leaders</span>
          </label>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
            Categorie
          </h3>

          <label className="flex items-center gap-3 mb-3 text-gray-800">
            <input
              type="checkbox"
              checked={showTM6}
              onChange={() => setShowTM6(!showTM6)}
              className="w-4 h-4"
            />
            <span>TM6</span>
          </label>

          <label className="flex items-center gap-3 text-gray-800">
            <input
              type="checkbox"
              checked={showAccessories}
              onChange={() => setShowAccessories(!showAccessories)}
              className="w-4 h-4"
            />
            <span>Accesorii</span>
          </label>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
            Demo Delivery
          </h3>

          <label className="flex items-center gap-3 text-gray-800">
            <input
              type="checkbox"
              checked={includeDemoDelivery}
              onChange={() => setIncludeDemoDelivery(!includeDemoDelivery)}
              className="w-4 h-4"
            />
            <span>Include +30€</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default SideBar;