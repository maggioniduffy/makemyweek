import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Button from "@mui/material/Button";

interface Props {
  next: string;
  disable?: boolean;
}
const DownButton = ({ next, disable = false }: Props) => {
  return (
    <Button
      href={"#" + next}
      disabled={disable}
      className="mt-8 animate__animated animate__bounce animate__delay-2s hover:bg-pink rounded-full"
    >
      <ArrowDownwardIcon
        fontSize="large"
        htmlColor="white"
        color={disable ? "disabled" : "inherit"}
      />
    </Button>
  );
};

export default DownButton;
