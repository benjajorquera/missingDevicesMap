import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Map from "./Map";
import Grid from "@mui/material/Grid";
import UpdateModal from "./UpdateModal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

const API_URL = "http://localhost:3000/api/v1/devices";

function Devices() {
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [deviceModal, setDeviceModal] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    fetchDevices();
  }, []);

  // Recibe los datos de los dispositivos
  const fetchDevices = async () => {
    await axios.get(API_URL).then(({ data }) => {
      setDevices(data);
      setSearchResults(data);
    });
  };

  // Elimina un dispositivo
  const deleteDevice = async (id) => {
    await axios
      .delete(API_URL + "/" + id)
      .then(({ data }) => {
        console.log(data.message);
        fetchDevices();
      })
      .catch(({ response: { data } }) => {
        console.log(data.message);
      });
  };

  // Selecciona los dispositivos de la lista
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // Elimina los dispositivos seleccionados
  const deleteSelectedDevices = async () => {
    await axios
      .delete(API_URL + "/destroySelected", { data: { ids: checked } })
      .then(({ data }) => {
        console.log(data.message);
        fetchDevices();
      })
      .catch(({ response: { data } }) => {
        console.log(data.message);
      });
  };

  // Función auxiliar de la barra de búsqueda
  const handleSearch = (value) => {
    filterData(value);
  };

  // Filtra los dispositivos por nombre
  const filterData = (value) => {
    const lowerCasedValue = value.toLowerCase().trim();
    if (lowerCasedValue === "") setDevices(searchResults);
    else {
      const filteredData = searchResults.filter((item) => {
        return Object.keys(item).some(() =>
          item.name.toString().toLowerCase().includes(lowerCasedValue)
        );
      });
      setDevices(filteredData);
    }
  };

  // Función auxiliar para abrir y cerrar la ventana modal
  const openModal = (device) => {
    setOpen(true);
    setDeviceModal(device);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs sx={{ m: 2 }}>
        <h2>Devices</h2>
        <SearchIcon />
        <Input
          placeholder="Enter name"
          onChange={(event) => handleSearch(event.target.value)}
          sx={{ width: "400px", m: 2 }}
        />
        <Button
          size="small"
          disabled={checked.length ? false : true}
          variant="contained"
          onClick={() => deleteSelectedDevices()}
          startIcon={<DeleteIcon />}
        >
          Delete selection
        </Button>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <nav aria-label="main mailbox folders">
            <List>
              {devices.map((device) => {
                let selected = false;
                let sx = {};
                if (device.state === "missing") {
                  selected = true;
                  sx = { border: 1, borderColor: "error.main" };
                }
                return (
                  <div key={device.id}>
                    <ListItem
                      disablePadding
                      sx={sx}
                      secondaryAction={
                        <div>
                          <Tooltip title="Edit">
                            <IconButton
                              edge="end"
                              aria-label="Edit"
                              onClick={() => openModal(device)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              edge="end"
                              aria-label="Delete"
                              onClick={() => deleteDevice(device.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      }
                    >
                      <ListItemButton
                        selected={selected}
                        onClick={handleToggle(device.id)}
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(device.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                          />
                          {device.state === "missing" ? (
                            <DeviceUnknownIcon />
                          ) : (
                            <></>
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={device.name}
                          secondary={device.type + " " + device.os_details.os}
                        />
                      </ListItemButton>
                    </ListItem>

                    <Divider />
                  </div>
                );
              })}
            </List>
            <UpdateModal
              open={open}
              onClose={() => setOpen(false)}
              deviceName={deviceModal.name}
              deviceState={deviceModal.state}
              deviceId={deviceModal.id}
              fetchDevices={() => fetchDevices()}
            />
          </nav>
        </Box>
      </Grid>
      <Grid item xs sx={{ m: 2 }}>
        <Map devices={devices} />
      </Grid>
    </Grid>
  );
}

export default Devices;
