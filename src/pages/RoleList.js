import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Box } from "@mui/material";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default function RoleList() {
  let emptyProduct = {
    id: null,
    name: '',
    abb: '',

};
  const [roles, setRoles] = useState([]);
  const [roleDialog, setRoleDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleteRoleDialog, setDeleteRoleDialog] = useState(false);
  const [role, setRole] = useState(emptyProduct);
  const products = [
    {
      id: 1,
      name: "Apple Watch",
      abb: "₦350,000",
    },
  ];

  //open add new role dialog
  const openNew = () => {
    setRole(emptyProduct);
    setSubmitted(false);
    setRoleDialog(true);
};

  //edit dialog
  const editProduct = (product) => {
    setRoles({ ...product });
    setRoleDialog(true);
  };

  //delete dialog
  const confirmDeleteRole = (product) => {
    setRoles(product);
    setDeleteRoleDialog(true);
  };

  //hide edit dialog
  const hideDialog = () => {
    setSubmitted(false);
    setRoleDialog(false);
  };

  //hide delete dialog
  const hideDeleteProductDialog = () => {
    setDeleteRoleDialog(false);
  };

  //footer of edit dialog
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" outlined icon="pi pi-times" onClick={hideDialog} />
      <Button label="Submit" icon="pi pi-check" />
    </React.Fragment>
  );
  //footer of delete dialog
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button label="Yes" icon="pi pi-check" severity="danger" />
    </React.Fragment>
  );


  //action buttons
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          style={{ margin: "0px 10px" }}
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteRole(rowData)}
        />
      </React.Fragment>
    );
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="30px"
      >
        <h3>Role List</h3>
        <Box>
          <Button
            label="Add New Role"
            icon="pi pi-plus"
            severity="success"
            style={{ margin: "0px 10px" }}
            onClick={openNew}
          />
        </Box>
      </Box>
      <Box className="card">
        <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }}>
          <Column field="id" header="Id" sortable></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="abb" header="Abbreviation" sortable></Column>
          <Column
            body={actionBodyTemplate}
            header="Action"
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </Box>
      {/* edit dialog */}
      <Dialog
        visible={roleDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Product Details"
        modal
        className="p-fluid"
        onHide={hideDialog}
        footer={productDialogFooter}
      >
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <InputText id="name" required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="abb" className="font-bold">
            Abbreviation
          </label>
          <InputText id="abb" required autoFocus />
        </div>
      </Dialog>
      {/* delete dialog */}
      <Dialog
        visible={deleteRoleDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />

          <span>Are you sure you want to delete ?</span>
        </div>
      </Dialog>
    </Box>
  );
}
