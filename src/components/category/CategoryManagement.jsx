import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Tooltip,
  Switch,
  Select,
} from "antd";
import { FaTrash } from "react-icons/fa";
import { EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Option } = Select;

const components = {
  header: {
    row: (props) => (
      <tr
        {...props}
        style={{
          backgroundColor: "#f0f5f9",
          height: "50px",
          color: "secondary",
          fontSize: "18px",
          textAlign: "center",
          padding: "12px",
        }}
      />
    ),
    cell: (props) => (
      <th
        {...props}
        style={{
          color: "secondary",
          fontWeight: "bold",
          fontSize: "18px",
          textAlign: "center",
          padding: "12px",
        }}
      />
    ),
  },
};

const CategoryManagement = () => {
  const [data, setData] = useState([
    {
      id: 1,
      categoryName: "Soil Analysis",
      submission: "Word Document",
      createdAt: "2025-08-01",
      status: "Active",
    },
    {
      id: 2,
      categoryName: "Marketing Report",
      submission: "PDF",
      createdAt: "2025-08-05",
      status: "Inactive",
    },
  ]);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [viewForm] = Form.useForm();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [addForm] = Form.useForm();

  // View/Edit Modal
  const showViewModal = (record) => {
    setSelectedRecord(record);
    viewForm.setFieldsValue(record);
    setIsViewModalVisible(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalVisible(false);
    setSelectedRecord(null);
  };

  const handleUpdateRecord = () => {
    viewForm.validateFields().then((values) => {
      setData((prev) =>
        prev.map((item) =>
          item.id === selectedRecord.id ? { ...item, ...values } : item
        )
      );
      Swal.fire({
        title: "Updated!",
        text: "Category details have been updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setIsViewModalVisible(false);
    });
  };

  // Add New Category
  const handleAddCategory = () => {
    addForm.validateFields().then((values) => {
      const newCategory = {
        id: data.length + 1,
        status: "Active",
        ...values,
      };
      setData((prev) => [...prev, newCategory]);
      Swal.fire({
        title: "Category Added!",
        text: `Category "${values.categoryName}" has been added successfully.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      addForm.resetFields();
      setIsAddModalVisible(false);
    });
  };

  const columns = [
    { title: "SL", dataIndex: "id", key: "id", align: "center" },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
    },
    {
      title: "Submission",
      dataIndex: "submission",
      key: "submission",
      align: "center",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
    { title: "Status", dataIndex: "status", key: "status", align: "center" },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 120,
      render: (_, record) => (
        <div
          className="flex gap-4 justify-between align-middle py-[3px] px-[15px] border border-primary rounded-md"
          style={{ alignItems: "center" }}
        >
          <Tooltip title="View & Update Details">
            <button
              onClick={() => showViewModal(record)}
              className="text-primary hover:text-green-700 text-xl"
            >
              <EditOutlined />
            </button>
          </Tooltip>

          <Tooltip title="Delete">
            <button
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    setData(data.filter((item) => item.id !== record.id));
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your record has been deleted.",
                      icon: "success",
                    });
                  }
                });
              }}
              className="text-red-500 hover:text-red-700 text-md"
            >
              <FaTrash />
            </button>
          </Tooltip>

          <Switch
            size="small"
            checked={record.status === "Active"}
            style={{
              backgroundColor: record.status === "Active" ? "#48B14C" : "gray",
            }}
            onChange={(checked) => {
              Swal.fire({
                title: "Are you sure?",
                text: `You are about to change status to ${
                  checked ? "Active" : "Inactive"
                }.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, change it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  setData((prev) =>
                    prev.map((item) =>
                      item.id === record.id
                        ? { ...item, status: checked ? "Active" : "Inactive" }
                        : item
                    )
                  );
                  Swal.fire({
                    title: "Updated!",
                    text: `Status has been changed to ${
                      checked ? "Active" : "Inactive"
                    }.`,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                }
              });
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-2 sm:gap-0 mb-4">
        <div className="">
          <Button
            type="primary"
            onClick={() => setIsAddModalVisible(true)}
            className="bg-primary !text-white hover:!text-secondary hover:!bg-white hover:!border-primary px-[25px] py-[22px] rounded-lg text-[16px] font-semibold"
          >
            Add New Category
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 10 }}
          bordered={false}
          size="small"
          rowClassName="custom-row"
          components={components}
          className="custom-table"
          scroll={{ x: "max-content" }}
        />
      </div>

      {/* View/Edit Modal */}
      <Modal
        title="Edit Category"
        visible={isViewModalVisible}
        onCancel={handleCloseViewModal}
        width={500}
        onOk={handleUpdateRecord}
        okText="Save Changes"
      >
        {selectedRecord && (
          <Form form={viewForm} layout="vertical">
            <Form.Item
              name="categoryName"
              label="Category Name"
              rules={[
                { required: true, message: "Please enter category name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Add New Category Modal */}
      <Modal
        title="Add New Category"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onOk={handleAddCategory}
        okText="Add Category"
        width={500}
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManagement;
