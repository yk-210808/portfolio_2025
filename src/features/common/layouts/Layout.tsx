import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
};

export const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="inner-block pt-10 pb-10">
      <div className="cat-area">
        <p className="text-4xl font-bold">{ title }</p>
        { children }
      </div>
    </div>
  )
}