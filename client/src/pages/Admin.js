import AdminDevice from "../components/AdminDevice";
import AdminBrand from "../components/AdminBrand";
import AdminType from "../components/AdminType";
import AdminUsers from "../components/AdminUsers";

const Admin = () => {
  return (
    <div>
      <AdminDevice />
      <AdminBrand />
      <AdminType />
      <AdminUsers />
    </div>
  );
};

export default Admin;
