import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        bgcolor: (theme) => theme.palette.grey[200],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "400px",
          maxWidth: "90vw",
          p: 2,
          display: "grid",
          gap: 2,
        }}
      >
        <TextField label="Username" fullWidth autoFocus />
        <TextField label="Password" fullWidth type="password" />
        <Button>Login</Button>
      </Paper>
    </Box>
  );
}

export default Login;

