import { Box, CircularProgress } from "@mui/material";

const SpinnerComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "full",
        alignItems: "center",
        justifyContent: "center",
        opacity: "0.8",
        background: "rgba(10,9,9, .2)",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default SpinnerComponent;
