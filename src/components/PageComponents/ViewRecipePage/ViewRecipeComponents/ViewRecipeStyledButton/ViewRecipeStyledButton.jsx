import { Button } from "@mui/material";
import styled from "@emotion/styled";

export default styled(Button)(() => ({
	color: "black",
	backgroundColor: "rgb(175, 175, 175)",
	width: "200px",
	height: "104px",
	border: "solid 2px black",
	fontWeight: "bold",
	fontSize: 15,
	"&:hover": {
		backgroundColor: "gray",
	},
}));
