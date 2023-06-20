import DownButton from "../DownButton";

interface Props {
  id: string;
  children?: JSX.Element;
  next?: string;
  disable?: boolean;
}

const Section = ({ id, next, children, disable = false }: Props) => {
  return (
    <div
      id={id}
      className="min-h-screen flex flex-col place-items-center justify-center w-full overflow-x-auto"
    >
      {children}
      {next && <DownButton next={next} disable={disable} />}
    </div>
  );
};

export default Section;
