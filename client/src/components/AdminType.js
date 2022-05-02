import { observer } from "mobx-react-lite";
import { useState } from "react";

import { Card, Button } from "react-bootstrap";

import CreateType from "./modals/CreateType";

import DeleteType from "./modals/DeleteType";
import UpdateType from "./modals/UpdateType";

const AdminType = observer(() => {
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
        Add Type
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-2"
        onClick={() => setDeleteVisible(true)}
      >
        Delete Type
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-2"
        onClick={() => setUpdateVisible(true)}
      >
        Edit Type
      </Button>

      <CreateType show={createVisible} onHide={() => setCreateVisible(false)} />
      <DeleteType show={deleteVisible} onHide={() => setDeleteVisible(false)} />
      <UpdateType show={updateVisible} onHide={() => setUpdateVisible(false)} />
    </Card>
  );
});

export default AdminType;
