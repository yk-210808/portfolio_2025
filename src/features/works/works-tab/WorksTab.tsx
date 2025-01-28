import { Button } from "flowbite-react";
import { Api } from "../api";
import { TypeWorksTax } from "../types";

type Props = {
  setCurrent: (value: string) => void;
}

export const WorksTab:React.FC<Props> = ({ setCurrent }) => {
  const tax = Api().tax.filter((item: TypeWorksTax) => item.count > 0);

  return (
    <ul className="flex flex-wrap gap-2 md:gap-5 align-center text-lg mt-4 md:mt-8">
      <li>
        <Button type="button" color="dark" className="font-bold current" size="sm" onClick={() => setCurrent('All')}>All</Button>
      </li>

      {tax[0] && tax.map((item: TypeWorksTax, index) => (
        <li key={index}>
          <Button type="button" color="blue" className="font-bold" size="sm" onClick={() => setCurrent(item.name)}>{item.name}</Button>
        </li>
      ))}
    </ul>
  )
}