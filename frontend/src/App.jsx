import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  CssBaseline,
  Paper,
  CircularProgress,
} from "@mui/material";

function App() {
  const [content, setContent] = useState("");
  const [tone, setTone] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReply("");

    try {
      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, tone }),
      });

      if (!response.ok) throw new Error("Server error: " + response.status);
      const data = await response.text();
      setReply(data);
    } catch (err) {
      setReply("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#fafafa",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 5,
              borderRadius: 3,
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            {/* Heading */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                mb: 4,
                color: "#222",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Email Reply Generator
            </Typography>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Original Email Content"
                multiline
                fullWidth
                rows={6}
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                sx={{ mb: 3 }}
              />

              <TextField
                label="Tone (Optional)"
                select
                fullWidth
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                sx={{ mb: 3 }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="formal">Formal</MenuItem>
                <MenuItem value="polite">Polite</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
              </TextField>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  backgroundColor: "#1976d2",
                  fontWeight: 600,
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "GENERATE REPLY"}
              </Button>
            </form>

            {/* Generated reply box */}
            {reply && (
              <Box
                sx={{
                  mt: 4,
                  textAlign: "left",
                  backgroundColor: "#f9f9f9",
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid #ddd",
                }}
              >
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  Generated Reply:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "Roboto, sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  {reply}
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default App;

