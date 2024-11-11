import React from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/Input";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/api/v1/devices";

const UpdateModal = ({
  open,
  onClose,
  deviceName,
  deviceState,
  deviceId,
  fetchDevices,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [fields, setFields] = useState({});

  useEffect(() => {
    setFields({ name: deviceName, state: deviceState });
  }, [deviceName, deviceState]);

  // Función auxiliar para los campos de texto
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFields((values) => ({ ...values, [name]: value }));
  };

  // Actualiza los dispositivos
  const updateDevice = async () => {
    await axios
      .put(API_URL + "/" + deviceId, fields)
      .then(({ data }) => {
        console.log(data.message);
        fetchDevices();
        onClose();
      })
      .catch(({ response: { data } }) => {
        console.log(data.message);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit device:
        </Typography>
        <Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-standard-label">Name</InputLabel>
            <TextField
              placeholder={deviceName}
              name="name"
              label="Name"
              defaultValue={deviceName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="demo-simple-select-standard-label">
              State
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              defaultValue={deviceState}
              label="State"
              name="state"
              onChange={handleChange}
            >
              <MenuItem value={"ok"}>ok</MenuItem>
              <MenuItem value={"missing"}>missing</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <IconButton aria-label="send" onClick={updateDevice}>
            <SendIcon />
          </IconButton>
          <IconButton aria-label="cancel" onClick={onClose}>
            <CancelIcon />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateModal;
