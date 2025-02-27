export function ObservationGrid() {
  return (
    <div id="ObservationGrid" className="w-full rounded-2xl overflow-hidden shadow-md border border-[#9D9D9D]">
      <div className="primary-bg-color px-4 py-2 text-white">
        <h2 id="ObservationGridTitle" className="font-medium"></h2>
      </div>

      <div className="grid grid-cols-1 gap-4 py-6 flex-grow">
        <p id="ObservationGridText" className="w-full p-4"></p>
      </div>

      <div className="h-10 primary-bg-color" />
    </div>
  );
}
