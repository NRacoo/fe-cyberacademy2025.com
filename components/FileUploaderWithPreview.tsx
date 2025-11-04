"use client";

import { useState, useEffect } from "react";
import { UploadIcon, XIcon, PaperclipIcon, CircleAlert } from "lucide-react";
import { CyberButton } from "@/components/ui/cyber-button";
import { formatBytes } from "@/hooks/use-file-upload";

export default function PDFUploader() {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPdfUrl(null);
    }
  }, [file]);

  const handleFile = (f: File) => {
    if (f.type !== "application/pdf") {
      setError("Hanya file PDF yang diperbolehkan!");
      setFile(null);
      return;
    }
    if (f.size > maxSize) {
      setError(`File terlalu besar! Maksimal ${formatBytes(maxSize)}`);
      setFile(null);
      return;
    }
    setError(null);
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dt = e.dataTransfer;
    if (dt.files.length > 0) handleFile(dt.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleFile(e.target.files[0]);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
      {/* Dropzone */}
      <div
        onClick={() => document.getElementById("pdfInput")?.click()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center min-h-[220px] w-full rounded-xl border-2 border-dashed p-4 transition-colors ${
          isDragging
            ? "border-pink-400 bg-pink-900/20"
            : "border-pink-500 bg-black/50"
        }`}
      >
        <input
          id="pdfInput"
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={handleChange}
        />

        {/* Preview PDF */}
        {file && pdfUrl && (
          <iframe
            src={pdfUrl}
            className="absolute inset-0 w-full h-full border-none rounded"
            title="PDF Preview"
          />
        )}

        {/* Icon & Text */}
        {!file && (
          <div className="flex flex-col items-center justify-center text-center z-10 pointer-events-none">
            <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-pink-500 bg-black/70">
              <UploadIcon className="h-6 w-6 text-white" />
            </div>
            <p className="mb-1.5 text-lg font-semibold text-white">
              Upload PDF
            </p>
            <p className="text-sm text-gray-300">
              Drag & drop atau klik untuk browse (max. {formatBytes(maxSize)})
            </p>
          </div>
        )}

        {/* Remove button */}
        {file && (
          <CyberButton
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 text-white hover:bg-pink-900 z-20"
            onClick={() => setFile(null)}
            aria-label="Remove file"
          >
            <XIcon className="h-4 w-4 text-white" />
          </CyberButton>
        )}
      </div>

      {/* Error alert */}
      {error && (
        <div className="rounded-md border border-red-500/50 px-4 py-3 text-red-600 flex items-center gap-2">
          <CircleAlert className="h-4 w-4 opacity-60" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* File info */}
      {file && (
        <div className="flex items-center gap-3 text-white text-sm px-2">
          <PaperclipIcon className="h-4 w-4" />
          <p className="truncate">{file.name}</p>
        </div>
      )}
    </div>
  );
}
