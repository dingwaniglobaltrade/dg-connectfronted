import React from "react";
import { getValueByKey } from "@/app/utils/getValueByKey";

// Safely convert nested values to string
const safeString = (val) => {
  if (val == null) return "";

  // Handle stringified arrays (like address)
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      return safeString(parsed);
    } catch {
      return val;
    }
  }

  // Handle arrays of objects or primitives
  if (Array.isArray(val)) {
    return val
      .map((v) => {
        if (typeof v === "object" && v !== null) {
          // Prioritize known keys for specific objects
          if ("routeName" in v) return v.routeName;
          if ("name" in v) return v.name; // for salesperson array
          return Object.values(v).filter(Boolean).join(", ");
        }
        return v;
      })
      .join(", ");
  }

  // Handle single object
  if (typeof val === "object") {
    return Object.values(val).filter(Boolean).join(", ");
  }

  return String(val);
};

export default function InfoSection({
  title,
  fields,
  userDetails,
  isEditing,
  setFormData,
}) {
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value, // works for flat keys; nested keys handled by getValueByKey
    }));
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      <h3 className="font-semibold text-primary text-lg">{title}</h3>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 text-sm">
        {fields.map((field, id) => {
          const value = getValueByKey(userDetails, field.key);

          return (
            <div key={id} className="flex flex-col">
              <label className="py-1 font-semibold text-black text-xs">
                {field.label}
              </label>

              {isEditing ? (
                <textarea
                  value={safeString(value)}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className={`py-1 border px-2 rounded focus:outline-none w-full resize-none overflow-auto
      ${
        ["email", "mobile", "gstn"].includes(field.key)
          ? "bg-gray-100 cursor-not-allowed"
          : "bg-white"
      }
    `}
                  rows={2}
                  readOnly={["email", "mobile", "gstn"].includes(field.key)}
                  title={
                    ["email", "mobile", "gstn"].includes(field.key)
                      ? "This field is not editable"
                      : safeString(value)
                  }
                />
              ) : (
                <p
                  className="py-1 border border-blue-50 px-2 rounded overflow-hidden break-words whitespace-pre-wrap"
                  title={safeString(value)}
                >
                  {safeString(value) || "-"}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
