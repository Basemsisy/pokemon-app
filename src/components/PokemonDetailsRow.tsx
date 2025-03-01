import { ReactNode } from "react";

type Props = {
  label: string;
  value: ReactNode;
};

const PokemonDetailsRow = (props: Props) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-3 text-gray-600 font-medium">{props.label}</td>
      <td className="py-3 text-right">{props.value}</td>
    </tr>
  );
};

export default PokemonDetailsRow;
