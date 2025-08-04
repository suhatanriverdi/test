import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { wellsApi } from "../../services/api";
import { Toast } from "../ui/Toast";

import type { DrillingDataRow } from "../MainDashboard/DrillingMonitoring";

interface FileUploadProps {
  onDataProcessed?: (data: DrillingDataRow[]) => void;
  selectedWellId?: string;
}

const FileUpload = ({ onDataProcessed, selectedWellId }: FileUploadProps) => {
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [uploadedData, setUploadedData] = useState<Record<string, unknown>[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setUploadStatus("uploading");
      setErrorMessage("");

      try {
        const response = await wellsApi.uploadFile(file);

        if (response.data.success) {
          setUploadedData(response.data.data);
          setUploadStatus("success");
          onDataProcessed?.(response.data.data);

          // If a well is selected, upload the data to that well
          if (selectedWellId) {
            await wellsApi.uploadWellData(selectedWellId, response.data.data);
          }
        } else {
          setUploadStatus("error");
          setErrorMessage(response.data.message || "Failed to process file");
        }
      } catch (error: unknown) {
        setUploadStatus("error");
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
        ) {
          setErrorMessage(
            (error as { response?: { data?: { message?: string } } }).response!.data!.message!
          );
        } else {
          setErrorMessage("Upload failed");
        }
      }
    },
    [onDataProcessed, selectedWellId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  });

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case "uploading":
        return <div className="loading loading-spinner loading-md"></div>;
      case "success":
        return <CheckCircle className="w-6 h-6 text-success" />;
      case "error":
        return <AlertCircle className="w-6 h-6 text-error" />;
      default:
        return <Upload className="w-6 h-6" />;
    }
  };

  const getStatusText = () => {
    switch (uploadStatus) {
      case "uploading":
        return "Processing file...";
      case "success":
        return "File uploaded successfully!";
      case "error":
        return errorMessage;
      default:
        return isDragActive
          ? "Drop the file here"
          : "Drag & drop an Excel file, or click to select";
    }
  };

  return (
    <div className="space-y-4">
      <Toast
        show={uploadStatus === "success" || uploadStatus === "error"}
        type={uploadStatus === "success" ? "success" : "error"}
        message={
          uploadStatus === "success"
            ? "File uploaded successfully!"
            : errorMessage
        }
        onClose={() => setUploadStatus("idle")}
      />
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/10"
            : uploadStatus === "success"
            ? "border-success bg-success/10"
            : uploadStatus === "error"
            ? "border-error bg-error/10"
            : "border-base-300 hover:border-primary"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          {getStatusIcon()}
          <div>
            <p className="text-lg font-semibold">{getStatusText()}</p>
            <p className="text-sm text-gray-500 mt-2">
              Supports .xlsx and .xls files
            </p>
          </div>
        </div>
      </div>

      {uploadedData.length > 0 && (
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">
              <FileSpreadsheet className="w-5 h-5" />
              Uploaded Data Preview
            </h3>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    {Object.keys(uploadedData[0] || {}).map((key) => (
                      <th key={key} className="text-xs">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {uploadedData.slice(0, 5).map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value: unknown, valueIndex) => (
                        <td key={valueIndex} className="text-xs">
                          {typeof value === "string" || typeof value === "number"
                            ? String(value)
                            : JSON.stringify(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {uploadedData.length > 5 && (
                <p className="text-xs text-gray-500 mt-2">
                  Showing first 5 rows of {uploadedData.length} total rows
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
