import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Button from "@mui/material/Button";

interface Props {
  next: string;
}
const DownButton = ({ next }: Props) => {
  return (
    <Button
      href={"#" + next}
      className="mt-8 animate__animated animate__bounce animate__delay-2s hover:bg-pink rounded-full"
    >
      <ArrowDownwardIcon fontSize="large" htmlColor="white" />
    </Button>
  );
};

export default DownButton;
