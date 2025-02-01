import { ChangeEventHandler, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState("");

  const handleChange = useCallback<
    ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  >((event) => {
    setFormValues((p) => ({
      ...p,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleLogin = useCallback(async () => {
    const res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    const data = await res.json();

    if (data.error) {
      setErrorText(data.error);
      return;
    }

    console.log(data);
  }, [formValues]);

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
        <TextField
          name="email"
          onChange={handleChange}
          value={formValues["email"]}
          label="Email"
          fullWidth
          autoFocus
          type="email"
        />
        <TextField
          name="password"
          onChange={handleChange}
          value={formValues["password"]}
          label="Password"
          fullWidth
          type="password"
        />
        {errorText && (
          <Typography
            variant="subtitle2"
            sx={{
              textTransform: "capitalize",
              color: (theme) => theme.palette.error.main,
            }}
          >
            {errorText}
          </Typography>
        )}
        <Button onClick={handleLogin}>Login</Button>
      </Paper>
    </Box>
  );
}

export default Login;

