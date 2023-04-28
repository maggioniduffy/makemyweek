import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Props {
  next: string;
}
const DownButton = ({ next }: Props) => {
  return (
    <a
      href={"#" + next}
      className="mt-8 animate__animated animate__bounce animate__delay-2s hover:bg-pink rounded-full"
    >
      <ArrowDownwardIcon fontSize="large" htmlColor="white" />
    </a>
  );
};

export default DownButton;
