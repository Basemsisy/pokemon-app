type Props = {
  title?: string;
};

const PageHeader = (props: Props) => {
  return (
    <header className="bg-blue-500 p-4">
      <h1 className="text-2xl font-bold text-white">
        {props.title || "PokeReact"}
      </h1>
    </header>
  );
};

export default PageHeader;
