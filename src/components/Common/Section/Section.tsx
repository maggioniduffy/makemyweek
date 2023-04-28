import DownButton from "../DownButton";

interface Props {
  id: string;
  children?: JSX.Element;
  next?: string;
}

const Section = ({ id, next, children }: Props) => {
  return (
    <div
      id={id}
      className="h-screen flex flex-col place-items-center justify-center w-full overflow-x-auto"
    >
      {children}
      {next && <DownButton next={next} />}
    </div>
  );
};

export default Section;
