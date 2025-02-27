export function NotesGrid() {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md border border-[#9D9D9D]">
      <div className="secondary-bg-color px-4 py-2 text-white">
        <h2 className="font-medium">Informações Importantes</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 py-6 place-items-center">
        <p id="NotesGridText" className="w-full p-4"></p>
      </div>

      <div className="h-10 secondary-bg-color" />
    </div>
  );
}
