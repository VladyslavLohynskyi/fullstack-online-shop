import { observer } from "mobx-react-lite";
import { useState } from "react";

import { Card, Button } from "react-bootstrap";

import CreateDevice from "./modals/CreateDevice";
import DeleteDevice from "./modals/DeleteDevice";
import UpdateDevice from "./modals/UpdateDevice";

const AdminDevice = observer(() => {
  const [createVisible, setCreateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  return (
    <Card
      className="d-flex flex-column"
      style={{ width: "80%", margin: "auto", padding: 15, marginTop: 15 }}
    >
      <Button
        variant={"outline-dark"}
        className="mt-2"
        onClick={() => setCreateVisible(true)}
      >
        Add Device
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-2"
        onClick={() => setDeleteVisible(true)}
      >
        Delete device
      </Button>
      <Button
        onClick={() => setUpdateVisible(true)}
        variant={"outline-dark"}
        className="mt-2"
      >
        Edit Device
      </Button>

      <CreateDevice
        show={createVisible}
        onHide={() => setCreateVisible(false)}
      />
      <DeleteDevice
        show={deleteVisible}
        onHide={() => setDeleteVisible(false)}
      />
      <UpdateDevice
        show={updateVisible}
        onHide={() => setUpdateVisible(false)}
      />
    </Card>
  );
});

export default AdminDevice;
