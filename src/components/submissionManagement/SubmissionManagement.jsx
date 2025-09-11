import React, { useState } from "react";
import { Table, Button, Modal, Input, Tooltip, Switch } from "antd";
import { FaTrash } from "react-icons/fa";
import { EyeOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const SubmissionManagement = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState("myDocuments");

  // Sample data for My Documents
  const [myDocuments, setMyDocuments] = useState([
    {
      id: 1,
      title: "Quantum-Entangled Communication",
      email: "alice@email.com",
      category: "Soil Test",
      date: "2025-08-01",
      status: "Active",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 2,
      title: "Quantum-Entangled Communication",
      email: "alice@email.com",
      category: "Soil Test",
      date: "2025-08-05",
      status: "Inactive",
      fileUrl:
        "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
    },
  ]);

  // Sample data for User's Documents
  const [userDocuments, setUserDocuments] = useState([
    {
      id: 1,
      title: "Quantum-Entangled Communication",
      email: "john@email.com",
      category: "Soil Test",
      date: "2025-08-02",
      status: "Active",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 2,
      title: "User Doc 2",
      email: "john@email.com",
      category: "Marketing",
      date: "2025-08-06",
      status: "Inactive",
      fileUrl:
        "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
    },
  ]);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchText, setSearchText] = useState("");

  const showViewModal = (record) => {
    setSelectedRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalVisible(false);
    setSelectedRecord(null);
  };

  // Determine current data
  const currentData =
    activeTab === "myDocuments"
      ? myDocuments.filter(
          (doc) =>
            doc.title.toLowerCase().includes(searchText.toLowerCase()) ||
            doc.email.toLowerCase().includes(searchText.toLowerCase()) ||
            doc.category.toLowerCase().includes(searchText.toLowerCase())
        )
      : userDocuments.filter(
          (doc) =>
            doc.title.toLowerCase().includes(searchText.toLowerCase()) ||
            doc.email.toLowerCase().includes(searchText.toLowerCase()) ||
            doc.category.toLowerCase().includes(searchText.toLowerCase())
        );

  const columns = [
    { title: "SL", dataIndex: "id", key: "id", align: "center" },
    { title: "Title", dataIndex: "title", key: "title", align: "center" },
    { title: "User E-mail", dataIndex: "email", key: "email", align: "center" },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    { title: "Date", dataIndex: "date", key: "date", align: "center" },
    { title: "Status", dataIndex: "status", key: "status", align: "center" },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div
          className="flex gap-4 justify-between align-middle py-[3px] px-[15px] border border-primary rounded-md"
          style={{ alignItems: "center" }}
        >
          {/* View Button */}
          <Tooltip title="View Document">
            <button
              onClick={() => showViewModal(record)}
              className="text-primary hover:text-green-700 text-xl"
            >
              <EyeOutlined />
            </button>
          </Tooltip>

          {/* Delete Button */}
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
                    const updateFunc =
                      activeTab === "myDocuments"
                        ? setMyDocuments
                        : setUserDocuments;

                    updateFunc((prev) =>
                      prev.filter((item) => item.id !== record.id)
                    );

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

          {/* Status Toggle */}
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
                  const updateFunc =
                    activeTab === "myDocuments"
                      ? setMyDocuments
                      : setUserDocuments;

                  updateFunc((prev) =>
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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        {/* Tabs */}
        <div className="flex gap-3">
          <Button
            type={activeTab === "myDocuments" ? "primary" : "default"}
            onClick={() => setActiveTab("myDocuments")}
            className="px-[50px] py-[20px] rounded-lg text-[16px] font-medium"
          >
            My Documents
          </Button>
          <Button
            type={activeTab === "userDocuments" ? "primary" : "default"}
            onClick={() => setActiveTab("userDocuments")}
            className="px-[50px] py-[20px] rounded-lg text-[16px] font-semibold"
          >
            User's Documents
          </Button>
        </div>

        {/* Search */}
        <div className="">
          <Input.Search
            placeholder="Search by Title, Email, Category"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table
          dataSource={currentData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          bordered={false}
          size="small"
          rowClassName="custom-row"
          className="custom-table"
          scroll={{ x: "max-content" }}
        />
      </div>

      {/* View Modal */}
      <Modal
        visible={isViewModalVisible}
        onCancel={handleCloseViewModal}
        width={800}
        footer={null}
      >
        {selectedRecord && (
          <div className="flex flex-col gap-2 w-full border border-primary rounded-md p-4 mt-8">
            <p className="text-[22px] font-bold text-primary mb-4">
              {selectedRecord.title}
            </p>
            {selectedRecord.fileUrl.endsWith(".pdf") ? (
              <iframe
                src={selectedRecord.fileUrl}
                style={{ width: "100%", height: "500px" }}
                title="PDF Preview"
              />
            ) : (
              <img
                src={selectedRecord.fileUrl}
                alt={selectedRecord.title}
                className="w-full h-auto rounded-md"
              />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SubmissionManagement;
