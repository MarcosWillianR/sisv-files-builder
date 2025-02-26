export function GridContainer({
  title = "",
  columns = 3,
  children,
  border = true,
  shadow = true,
  fullPage = false,
  bgColor = "primary",
  footer = false,
}) {
  const getGridCols = () => {
    const gridMap = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    };
    return gridMap[columns] || gridMap[3];
  };

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden ${
        shadow ? "shadow-md" : ""
      } ${border ? "border border-[#9D9D9D]" : ""}`}
    >
      {title && title.length !== 0 && (
        <div
          className={`${
            bgColor === "primary" ? "bg-[#FDB017]" : "bg-[#6C097D]"
          } px-4 py-2 text-white`}
        >
          <h2 className="font-medium">{title}</h2>
        </div>
      )}

      {fullPage ? (
        <div className="h-[96vh] flex items-center justify-center">
          <div className={`grid ${getGridCols()} gap-4 p-6 flex-grow`}>
            {children}
          </div>
        </div>
      ) : (
        <div className={`grid ${getGridCols()} gap-4 p-6 place-items-center`}>
          {children}
        </div>
      )}
      {footer && (
        <div
          className={`h-10 ${
            bgColor === "primary" ? "bg-[#FDB017]" : "bg-[#6C097D]"
          }`}
        ></div>
      )}
    </div>
  );
}
