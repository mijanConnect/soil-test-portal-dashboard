import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const UploadDocument = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const categories = ["Soil Test", "Marketing", "Finance", "Research"]; // Example categories

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = (values) => {
    if (fileList.length === 0) {
      message.error("Please upload at least one file.");
      return;
    }

    const formData = {
      ...values,
      files: fileList.map((file) => file.name),
    };

    console.log("Form Data Submitted:", formData);
    message.success("Document uploaded successfully!");
    form.resetFields();
    setFileList([]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border border-primary rounded-md shadow-sm bg-white">
      <p className="text-[22px] font-bold text-primary mb-4">Upload Document</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter the document title" },
          ]}
        >
          <Input placeholder="Enter document title" />
        </Form.Item>

        {/* Short Description */}
        <Form.Item
          label="Short Description"
          name="shortDescription"
          rules={[
            { required: true, message: "Please enter a short description" },
          ]}
        >
          <Input placeholder="Enter a brief description" />
        </Form.Item>

        {/* Category */}
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select category">
            {categories.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* File Upload */}
        <Form.Item
          label="Upload File"
          name="file"
          rules={[{ required: true, message: "Please upload a file" }]}
        >
          <Upload
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false} // prevent automatic upload
            multiple
            accept=".pdf,.png,.jpg,.jpeg"
          >
            <Button icon={<UploadOutlined />}>
              Click to Upload (PDF/Images)
            </Button>
          </Upload>
        </Form.Item>

        {/* Detailed Description */}
        <Form.Item
          label="Detailed Description"
          name="detailedDescription"
          rules={[
            { required: true, message: "Please enter detailed description" },
          ]}
        >
          <TextArea rows={5} placeholder="Enter detailed description here..." />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-primary !text-white hover:!text-secondary hover:!bg-white hover:!border-primary px-6 py-3 rounded-md text-[16px] font-semibold"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadDocument;
