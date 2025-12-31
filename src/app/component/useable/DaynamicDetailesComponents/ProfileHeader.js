import React, { useState, useEffect } from "react";
import { getImageUrl } from "@/app/utils/imageurl";

export default function ProfileHeader({
  userDetails,
  isEditing,
  setIsEditing,
  handleSave,
  setFormData,
  formData,
}) {
  // Generate initial preview URL using getImageUrl if we have a fileName
  const initialImage = userDetails.profileImage
    ? getImageUrl(userDetails.profileImage)
    : userDetails.shopImage
    ? getImageUrl(userDetails.shopImage)
    : null;

  const [previewImage, setPreviewImage] = useState(initialImage);

  useEffect(() => {
    // Reset preview when editing is cancelled
    if (!isEditing) {
      const resetImage = userDetails.profileImage
        ? getImageUrl(userDetails.profileImage)
        : userDetails.shopImage
        ? getImageUrl(userDetails.shopImage)
        : null;
      setPreviewImage(resetImage);
    }
  }, [isEditing, userDetails.profileImage, userDetails.shopImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview locally
      setPreviewImage(URL.createObjectURL(file));
      // Save file in formData for uploading later
      setFormData((prev) => ({ ...prev, profileImage: file }));
    }
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
          ) : (
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

      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit Profile
        </button>
      ) : (
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
      )}
    </div>
  );
}
