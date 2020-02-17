import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

const GorilaButton = styled(Button)({
  background: "linear-gradient(45deg, #19c3c1 30%, #4add93 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(74, 219, 150, .3)",
  color: "white",
  fontWeight: 600,
  height: 48,
  padding: "0 30px"
});

export default GorilaButton;
