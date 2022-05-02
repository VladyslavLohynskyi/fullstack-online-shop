import { useState } from "react";

import { Card, Button } from "react-bootstrap";
import DeleteBrand from "./modals/DeleteBrand";
import CreateBrand from "./modals/CreateBrand";
import UpdateBrand from "./modals/UpdateBrand";

const AdminBrand = () => {
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
        Add Brand
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-2"
        onClick={() => setDeleteVisible(true)}
      >
        Delete Brand
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-2"
        onClick={() => setUpdateVisible(true)}
      >
        Edit Brand
      </Button>
      <DeleteBrand
        show={deleteVisible}
        onHide={() => setDeleteVisible(false)}
      />
      <CreateBrand
        show={createVisible}
        onHide={() => setCreateVisible(false)}
      />
      <UpdateBrand
        show={updateVisible}
        onHide={() => setUpdateVisible(false)}
      />
    </Card>
  );
};

export default AdminBrand;
