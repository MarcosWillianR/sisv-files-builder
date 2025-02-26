import { GridContainer } from "./grid-container";

export function GridPageWrapper({
  children,
  itemsPerPage,
  title,
  columns = 2,
  border = true,
  shadow = true,
  bgColor = "primary",
  ...rest
}) {
  const chunks = [];
  for (let i = 0; i < children.length; i += itemsPerPage) {
    chunks.push(children.slice(i, i + itemsPerPage));
  }

  return (
    <>
      {chunks.map((chunk, index) => (
        <div key={index} className="break-before-page first:break-before-auto">
          <GridContainer
            title={index === 0 ? title : ""}
            columns={columns}
            border={border}
            shadow={shadow}
            bgColor={bgColor}
            {...rest}
          >
            {chunk}
          </GridContainer>
        </div>
      ))}
    </>
  );
}
