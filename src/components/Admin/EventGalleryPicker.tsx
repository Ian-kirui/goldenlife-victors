"use client";

import { useState, useRef } from "react";
import { uploadEventGalleryImage } from "@/utils/blogApi";
import toast from "react-hot-toast";
import type { EventImageResponse } from "@/types/api.types";

interface EventGalleryPickerProps {
  token: string;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function EventGalleryPicker({ token, selectedIds, onChange }: EventGalleryPickerProps) {
  const [uploaded, setUploaded] = useState<EventImageResponse[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const results = await Promise.all(
        files.map((f) => uploadEventGalleryImage(token, f))
      );
      setUploaded((prev) => [...prev, ...results]);
      // Auto-select newly uploaded images
      onChange([...selectedIds, ...results.map((r) => r.id)]);
      toast.success(`${results.length} image${results.length > 1 ? "s" : ""} uploaded`);
    } catch (e: any) {
      toast.error(e.message ?? "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const toggle = (id: string) => {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((s) => s !== id)
        : [...selectedIds, id]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Event Gallery Images
        </label>
        <span className="text-xs text-gray-400">{selectedIds.length} selected</span>
      </div>

      {/* Upload button */}
      <label className={`flex items-center gap-2 w-fit cursor-pointer text-sm font-medium text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
        {uploading ? (
          <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />Uploading…</>
        ) : (
          <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>Upload Images</>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>

      {/* Image grid — pick which ones to attach to this event */}
      {uploaded.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {uploaded.map((img) => {
            const selected = selectedIds.includes(img.id);
            return (
              <button
                key={img.id}
                type="button"
                onClick={() => toggle(img.id)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                  selected ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img.url} alt={img.originalFilename} className="w-full h-24 object-cover" />
                {selected && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <p className="text-xs text-gray-500 truncate px-1 py-0.5 bg-white dark:bg-gray-900">
                  {img.originalFilename}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {uploaded.length === 0 && (
        <p className="text-xs text-gray-400">
          Upload images first, then select which ones to include in this event's gallery.
        </p>
      )}
    </div>
  );
}