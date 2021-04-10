import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
    height: 500
  },
  media: {
    height: 200,
    paddingTop: "56.25%"
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between"
  }
}));
