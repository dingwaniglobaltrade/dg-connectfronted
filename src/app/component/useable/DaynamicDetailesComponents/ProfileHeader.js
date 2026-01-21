import React, { useState, useEffect } from "react";
import { getImageUrl } from "@/app/utils/imageurl";
import { useSelector } from "react-redux";

export default function ProfileHeader({
  userDetails,
  isEditing,
  setIsEditing,
  handleSave,
  setFormData,
  formData,
}) {
 const loginState = useSelector((state) => state.login);
  const UserType = loginState?.admin?.userType;

  // Decide which S3 key to use
  const s3Key =
    userDetails?.profileImage || userDetails?.shopImage || null;

  // Local preview (only for editing)
  const [previewImage, setPreviewImage] = useState(null);

  // Reset preview when edit is cancelled
  useEffect(() => {
    if (!isEditing) {
      setPreviewImage(null);
    }
  }, [isEditing]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview
    setPreviewImage(URL.createObjectURL(file));

    // Store file for upload
    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));
  };

  return (
    <div className="flex items-center justify-between py-6 border-b mb-6">
      <div className="flex flex-row gap-4">
        <div className="relative w-[70px] h-[70px] rounded-full overflow-hidden">
          {previewImage ? (
            <img
              className="rounded-full h-full w-full object-cover"
              src={previewImage}
              alt="Profile Image"
            />
          ) : s3Key ? (
            // 🔵 Existing S3 image
            <S3Image
              s3Key={s3Key}
              alt="Profile Image"
              className="w-full h-full object-cover rounded-full"
            />
          ) :  (
            <div className="rounded-full h-full w-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              N/A
            </div>
          )}
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          )}
        </div>

        <div className="flex flex-col mt-2">
          <h2 className="text-2xl font-semibold text-primary">
            {userDetails.firmName || userDetails.shopName || userDetails.name}
          </h2>
          <p className="text-gray-500 text-sm">Profile Details</p>
        </div>
      </div>

      {!isEditing && (UserType === "admin" || UserType === "subadmin") ? (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit Profile
        </button>
      ) : isEditing ? (
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setFormData(userDetails); // Reset edits
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : null}
    </div>
  );
}
