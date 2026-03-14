function PersonCard({
  name,
  role,
  tm6,
  accessories,
  total,
  showTM6,
  showAccessories,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 min-h-[280px]">
      <h3 className="text-2xl font-bold text-green-700 uppercase">
        {name}
      </h3>

      <p className="mt-1 text-sm text-gray-500">{role}</p>

      <div className="mt-6 space-y-3 text-gray-700 text-lg">
        {showTM6 && (
          <p>
            TM6 vândute: <span className="font-semibold">{tm6}</span>
          </p>
        )}

        {showAccessories && (
          <p>
            Accesorii:{" "}
            <span className="font-semibold">{accessories.toFixed(2)} €</span>
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-300">
        <p className="text-2xl font-bold text-black">
          Total: {total.toFixed(2)} €
        </p>
      </div>
    </div>
  );
}

export default PersonCard;